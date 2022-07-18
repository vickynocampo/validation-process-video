//Este middleware sera de aplicacion ya que el nav-bar esta en todas las paginas
function userLoggedMiddleware (req, res, next){
    //Pregunto si hay alguien en session para mostrar algo o no
    res.locals.isLogged = false; //Variable que puedo compartir a traves de todas las vistas. Toda la aplicacion va a conocer de esta variable. Luego voy al nav-bar.ejs
    if(req.session && req.session.usuarioLogueado){
    res.locals.isLogged = true;
    }

    //Quiero traer la cookie que seteamos cuando en body viaja rememberMe on:
    //let emailInCookie = req.cookies.userMail//le digo que del request quiero las cookies y quiero obtener lo que vino en el userMail. 
   
   //let colorInCookie = 

    next();
}

module.exports = userLoggedMiddleware;