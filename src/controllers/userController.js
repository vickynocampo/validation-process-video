const { validationResult } = require("express-validator");
const User = require("../models/User"); //Requiero el CRUD de usuarios
const bcrypt = require("bcryptjs");


const controller = {
    register: (req, res) => {
        return res.render("userRegisterForm");
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("userRegisterForm", {
                errors: resultValidation.mapped(),
                OldData : req.body
            });
        }

        //Debo verificar si el mail con el que esta intentando registrar el usuario esta en la DB 
        let userInDb = User.findByField("mail", req.body.mail);

        //Si el mail existe, debo mostrar nuevamente la vista con el formulario con un mensaje de error ya que no puede utilizar ese mail
        if(userInDb){
            return res.render("userRegisterForm", { //utilizo un codigo similar al de resultValidation, devolviendo asimismo OldData
                //Genero un objeto literal con la propiedad mail que a su vez tendra una propiedad msg con el texto de error
                errors: { mail:{msg: "Este mail ya se encuentra registrado"}},
                OldData : req.body
            });
        }

        //console.log(req.body, req.file);
        let userToCreate = {
            ...req.body, 
            password : bcrypt.hashSync(req.body.password, 10),//Piso el password que viene del body
            avatar : req.file.filename //Multer deja en el request una propiedad llamada file y de este file voy a obtener la propiedad filname
        }
        //Agrego metodo de User(de models) y le paso el body del request
        let userCreated = User.create(userToCreate);
        // return res.send("Ok, se guardo al usuario")
        return res.redirect("/user/login");
    },
    login: (req, res) => {
        return res.render("userLoginForm");
    },
    loginProcess: (req, res) => {
        //usamos el metodo de findByField para pasarle por parametro el mail ingresado en el form, si el usuario existe, lo devuelve.
        let userToLogin = User.findByField("mail", req.body.mail);
        //hacemos un if para los escenarios si encontro o no al mail que obtuvimos por body
        if(userToLogin){
            //Si el mail existe ahora debemos validar el password:
            //Antes debemos usar bcryptjs.compareSync:
            let claveEsCorrecta = bcrypt.compareSync(req.body.password, userToLogin.password); //Esto devuelve un booleano
            if(claveEsCorrecta){
                return res.redirect("/user/profile")
            } 
            return res.render("userLoginForm", {errors:{mail: {msg: "Las credenciales son invalidas"}}});
        } 
        return res.render("userLoginForm", {errors:{mail: {msg: "El mail no se encuentra registrado"}}}   
        );
    },

    profile: (req, res) => {
        return res.render("userProfile");
    }
}

module.exports = controller;