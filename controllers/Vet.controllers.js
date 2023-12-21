import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { VetModel } from '../models.js/Vet.model.js'
import generateJWT from '../helpers/generateJWT.js'
import generarId from '../helpers/generateId.js'
import emailRegister from '../helpers/emailRegister.js'
import emailForgotPassword from '../helpers/emailForgotPassword.js'

// import messages from '../utils/messages.js'
// import generateId from '../helpers/generateId.js'

// const { messageGeneral } = messages
const vetCtrl = {}

vetCtrl.register = async (req, res) => {
  const { email, name, password } = req.body

  // Prevenir usuarios duplicados
  const existUser = await VetModel.findOne({ email })
  if (existUser) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }

  try {
    //validamos que llegue la data
    if (!name || !email || !password) {
      res.status(400).json({
        message: 'Todos los campos son obligatorios'
      })
    }

    //creamos el veterinario
    const vet = new VetModel(req.body)
    const vetSave = await vet.save()

    //enviamos el email
    emailRegister({
      email,
      name,
      token: vetSave.token
    })

    //enviamos el mensaje de bienvenida
    res.status(201).json({
      data: vetSave,
      message: 'Usuario creado correctamente'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

vetCtrl.profile = async (req, res) => {
  const { vet } = req
  res.json(vet)
  // res.json({msg: 'Datos del perfil'});
}

vetCtrl.confirm = async (req, res) => {
  const { token } = req.params

  const userConfirm = await VetModel.findOne({ token })

  if (!userConfirm) {
    const error = new Error('Token no válido')
    return res.status(404).json({ msg: error.message })
  }

  try {
    userConfirm.token = null
    userConfirm.confirm = true
    await userConfirm.save()

    return res.json({ msg: 'Usuario Confirmado Correctamente' })
  } catch (error) {
    console.log(error)
  }
}

vetCtrl.login = async (req, res) => {
  const { email, password } = req.body

  // Comprobar si el usuario existe
  const user = await VetModel.findOne({ email })
  if (!user) {
    const error = new Error('El Usuario no existe')
    return res.status(404).json({ msg: error.message })
  }
  // Comprobar si el usuario esta confirmado
  if (!user.confirm) {
    const error = new Error('Tu Cuenta no ha sido confirmada')
    return res.status(403).json({ msg: error.message })
  }
  // Revisar el password
  if (await user.confirmPassword(password)) {
    user.token = res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id)
    })
  } else {
    const error = new Error('El Password es incorrecto')
    return res.status(403).json({ msg: error.message })
  }
}

vetCtrl.forgetPassword = async (req, res) => {
  const { email } = req.body

  const existVet = await VetModel.findOne({ email })
  if (!existVet) {
    const error = new Error('El Usuario no existe')
    return res.status(400).json({ msg: error.message })
  }

  try {
    existVet.token = generarId()
    await existVet.save()

    //envar emial con instrucciones
    emailForgotPassword({
      email,
      name: existVet.name,
      token: existVet.token
    })

    res.json({ msg: 'Hemos enviado un email con las instrucciones' })
  } catch (error) {
    console.log(error)
  }
}

vetCtrl.validateToken = async (req, res) => {
  const { token } = req.params

  const tokenValid = await VetModel.findOne({ token })

  if (tokenValid) {
    // El token es válido, el usuario existe
    res.json({ msg: 'Token válido y el usuario existe' })
  } else {
    const err = new Error('Token no válido')
    return res.status(400).json({ msg: err.message })
  }
}

vetCtrl.newPassword = async (req, res) => {
  const { token } = req.params
  console.log(token)
  const { password } = req.body

  const vet = await VetModel.findOne({ token })

  if (!vet) {
    const err = new Error('Hubo un error')
    return res.status(400).json({ msg: err.message })
  }

  try {
    vet.token = null
    vet.password = password
    await vet.save()

    res.json({ msg: 'Contraseña modificada correctamente' })
  } catch (error) {
    console.log(error)
  }
}

vetCtrl.updateProfile = async (req, res) => {
  const vet = await VetModel.findById(req.params.id)

  if (!vet) {
    const error = new Error('Hubo un error')
    res.status(400).json({
      msg: error.message
    })
  }

  const { email } = req.body

  if (vet.email !== req.body.email) {
    const existEmail = await VetModel.findOne({ email })

    if (existEmail) {
      const error = new Error('Ese email ya está en uso')
      res.status(400).json({
        msg: error.message
      })
    }
  }

  try {
    vet.name = req.body.name
    vet.email = req.body.email
    vet.web = req.body.web
    vet.phone = req.body.phone

    const vetUpdate = await vet.save()
    res.json(vetUpdate)
  } catch (error) {
    console.log(error)
  }
}

vetCtrl.updatePassword = async (req, res) => {
  //leer los datos
  const { id } = req.vet
  const { pwd_actual, pwd_new } = req.body

  //Comprobar que exista el veterinario
  const vet = await VetModel.findById(id)

  if (!vet) {
    const error = new Error('Hubo un error')
    res.status(400).json({
      msg: error.message
    })
  }

  //comprobar su password
  if (await vet.confirmPassword(pwd_actual)) {
    //almacenar el nuevo password
    vet.password = pwd_new;
    await vet.save()

    
    res.json({
      msg: 'Contraseña almacenada correctamente'
    })
  } else {
    const error = new Error('La contraseña Actual es Incorrecta')
    res.status(400).json({
      msg: error.message
    })
  }
}

export default vetCtrl
