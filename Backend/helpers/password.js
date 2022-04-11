const nodemailer = require("nodemailer");
const nuevoPassword = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "06838f9714de80",
      pass: "d16d2a47a470a2",
    },
  });
  //informacion del email
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos"<cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta para actualizar tu contraseña ",
    text: "Compruba tu cuenta en Uptask",
    html: `<p>${nombre} Comprueba tu cuenta en UpTask</p>
    <p>Tu cuenta ya esta casi lista debes comprobarla en el siguiente enlace</p>
    <a href="http://localhost:3000/olvide-password/${token}">Comprobar Cuenta</a>
    <p>Si tu no creaste esta cuenta ,puedes ignorar este mensaje</p>
    
    `,
  });
};
module.exports = nuevoPassword;
