const express = require("express");
const router = express.Router();
const path = require("path");

//Controller
const userController = require("../controllers/userController.js");

//Middlewares
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");


//Formulario de Registro
router.get("/register", guestMiddleware, userController.register);//Si alguien esta logueado no puede ingresar en register, si no es asi, el middleware ejecuta el siguiente proceso de peticion

//Procesar el Registro
router.post("/register", uploadFile.single("avatar"), validations, userController.processRegister);

//Formulario de Login
router.get("/login", guestMiddleware, userController.login);//Reutilizo el middleware guestMiddleware por si hay alguien logueado, sera dirijio a Profile

//Proceso de Login
router.post("/login", userController.loginProcess);

//Perfil de Usuario
router.get("/profile/", authMiddleware, userController.profile);//Si no hay nadie logueado, sera dirijido a Login, de lo contrario continua el proceso de peticion

//Logout
router.get("/logout", userController.logOut)

module.exports = router;