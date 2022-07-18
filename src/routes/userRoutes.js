const express = require("express");
const router = express.Router();
const path = require("path");

//Controller
const userController = require("../controllers/userController.js");

//Middlewares
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");

//Formulario de Registro
router.get("/register", userController.register);

//Procesar el Registro
router.post("/register", uploadFile.single("avatar"), validations, userController.processRegister);

//Formulario de Login
router.get("/login", userController.login);

//Proceso de Login
router.post("/login", userController.loginProcess);

//Perfil de Usuario
router.get("/profile/", userController.profile);

module.exports = router;