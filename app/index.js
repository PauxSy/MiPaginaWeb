import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

// Obtener el directorio actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear un servidor para redirigir las solicitudes del puerto 80 a localhost:4000
const redirectApp = express();
redirectApp.get('*', (req, res) => {
    res.redirect('http://localhost:4000');
});

redirectApp.listen(80, () => {
    console.log("Redirigiendo en el puerto 80 a http://localhost:4000");
});

// Crear el servidor principal en el puerto 4000
const app = express();
app.set("port", 4000);
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en puerto", app.get("port"));
});

// Configuración
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/index.html")));
app.get("/login", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/login.html")));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/register.html")));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin/admin.html")));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);
