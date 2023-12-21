import nodemailer from 'nodemailer'

const emailForgotPassword = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, name, token } = datos;

      //enviar el emial

      const info = await transport.sendMail({
        from: 'Administrador de Pacientes de Veterinaria',
        to: email,
        subject: 'Restablece tu contraseña',
        text: 'Restablece tu contraseña',
        html: `<p>Hola ${name}, has solicitado restablecer tu contraseña</p>

        <p>Dale click al siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer contraseña</a> </p>
        <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
        `
      });

      console.log('Mensaje enviado: %s', info.messageId);
}

export default emailForgotPassword;