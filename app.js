//Requires:
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

//Middlewares
app.use(express.urlencoded({extended: false})); //IMPORTANTE caputa info. que viene desde un form. en req.body, sin ella no se puede obtener info. del body

//Ruteadores
const mainRoutes = require("./src/routes/mainRoutes");
const userRoutes = require("./src/routes/userRoutes");

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use("/", mainRoutes);
app.use("/user", userRoutes)

app.listen((port),()=>{console.log("Servidor corriendo en puerto 3000");})