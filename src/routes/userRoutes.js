const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../public/images/avatars" ));
    },
    filename: (req, file, cb) => {
      
        let nameFile = Date.now() + "img" + path.extname(file.originalname);
        cb(null, nameFile );
    }
})

const uploadFile = multer({storage});

const userController = require("../controllers/userController.js");

const validations = [
    body("nombre").notEmpty().withMessage("Tiene que escribir tu nombre"),
    body("mail").notEmpty().withMessage("Tienes que escribir un correo electronico").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido"),
    body("password").notEmpty().withMessage("Tienes que escribir una contraseña").bail()
    .isInt().withMessage("La contraseña debe ser numerica"),
    body("pais").notEmpty().withMessage("Tienes que elegir un Pais"),
    body("avatar").custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif"];

        if (!file){
            throw new Error("Tienes que subir una imagen");
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extensiones de arhcivo permitidas son ${acceptedExtensions.join(", ")}`)
            }
        }
        return true;
    })
]

//Formulario de Registro
router.get("/register", userController.register);

//Procesar el Registro
router.post("/register", uploadFile.single("avatar"), validations, userController.processRegister);

//Formulario de Login
router.get("/login", userController.login);

//Perfil de Usuario
router.get("/profile/:userId", userController.profile);

module.exports = router;