import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
  user: "a",
  email: "a@a.com",
  password: "$2a$05$nLY2It8riku2vwwDIINdgO/XIyPXRg1Gn9LFgnhwKqC4TwcAwEUL2"
}]


async function login(req, res) {
  const user = req.body.user;
  const password = req.body.password;

  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
  if (!usuarioARevisar) {
    return res.status(400).send({ status: "Error", message: "El usuario ingresado no existe" });
  }

  try {
    const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password);
    if (!loginCorrecto) {
      return res.status(400).send({ status: "Error", message: "Tu contraseña o nombre de usuario es incorrecto" });
    }

    const token = jsonwebtoken.sign(
      { user: usuarioARevisar.user },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      path: "/"
    };
    res.cookie("jwt", token, cookieOption);
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    return res.status(500).send({ status: "Error", message: "Error durante el inicio de sesión" });
  }
}


async function register(req,res){
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;
  if(!user || !password || !email){
    return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
  }
  const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
  if(usuarioAResvisar){
    return res.status(400).send({status:"Error",message:"Este usuario ya existe"})
  }
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(password,salt);
  const nuevoUsuario ={
    user, email, password: hashPassword
  }
  usuarios.push(nuevoUsuario);
  console.log(usuarios);
  return res.status(201).send({status:"ok",message:`Usuario ${nuevoUsuario.user} agregado`,redirect:"/"})
}

export const methods = {
  login,
  register
}