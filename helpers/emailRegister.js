import nodemailer from 'nodemailer'

const emailRegister = async(datos) => {
  console.log('Usuario registrado');
    // const transport = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS
    //     }
    //   });

    //   const { email, name, token } = datos;

  
    //   //enviar el emial
    //   try {
    //     const info = await transport.sendMail({
    //       from: 'Administrador de Pacientes de Veterinaria',
    //       to: email,
    //       subject: 'Comprueba tu cuenta en APV',
    //       text: 'Comprueba ti cuenta en APV',
    //       html: `<p>Hola ${name}, comprueba tu cuenta en APV</p>
    //       <p>Tu cuenta está casi lista, solo debes comprobarla dando click en el enlace:
    //       <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar cuenta</a> </p>
    //       <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
    //       `
    //     });
        
    //     console.log('Mensaje enviado: %s', info.messageId);
    //   } catch (error) {
    //     console.log(error);
    //   }
      
}

export default emailRegister;