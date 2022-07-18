//Requires:
const express = require("express");
const path = require("path");
const session = require("express-session");
const usserLoggedMiddleware = require("./src/middlewares/userMiddleware");
const cookies = require("cookie-parser")

const app = express();
const port = 3000;
const publicPath = path.resolve(__dirname, "./src/public");

//Middlewares
app.use(session({
    secret: "Informacion confidencial",
    resave: false,
    saveUninitialized: false,
}));//Session es un objeto literal que vive en el request: req.session y desde ahi accedo a todo lo que tengo en el request
app.use(cookies());//To lo que se guarda en el cliente/navegador
app.use(usserLoggedMiddleware);
app.use(express.urlencoded({extended: false})); //IMPORTANTE caputa info. que viene desde un form. en req.body, sin ella no se puede obtener info. del body
app.use(express.static(publicPath));

//Ruteadores
const mainRoutes = require("./src/routes/mainRoutes");
const userRoutes = require("./src/routes/userRoutes");

//Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use("/", mainRoutes);
app.use("/user", userRoutes)

app.listen((port),()=>{console.log("Servidor corriendo en puerto 3000");})