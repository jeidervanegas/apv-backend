import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import { connectDb } from './connection/db.js'
import userRoutes from './routes/Vet.route.js'
import patientsRoutes from './routes/patients.route.js'

connectDb()

const app = express()


const PORT = process.env.PORT || 3026

const dominiosPermitdios =['http://localhost:5173'];

// const corsOption = {
//   origin: function(origin, callback) {
//     if(dominiosPermitdios.indexOf(origin) !== -1){
//       //el origen está permitido
//       callback(null, true)
//     }else {
//       callback(new Error('No permitido por CORS'))
//     }
//   }
// }

//corsOption
//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/veterinarians', userRoutes);
app.use('/api/patients', patientsRoutes);


//listen
app.listen(PORT, () => {
  console.log(`El servidor está esuchando en el puerto ${PORT}`)
})
