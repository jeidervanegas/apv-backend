import { PatientModel } from '../models.js/Patient.model.js'

const patientCtrl = {}

patientCtrl.addPatient = async (req, res) => {
  // const { name, owner, email, symptoms } = req.body;

  const patient = new PatientModel(req.body)

  patient.vet = req.vet._id

  try {
    const patientSave = await patient.save()

    res.json(patientSave)
  } catch (error) {
    console.log(error)
  }
}

patientCtrl.listPatient = async (req, res) => {
  const patient = await PatientModel.find().where('vet').equals(req.vet)

  res.status(200).json(patient)
}

patientCtrl.opPatient = async (req, res) => {
  const { id } = req.params

  const patient = await PatientModel.findById(id)

  if (!patient) {
    return res.status(404).json({ msg: 'No encontrado' })
  }

  if (patient.vet._id.toString() !== req.vet._id.toString()) {
    return res.json({ msg: 'Acción no válida' })
  }

  res.json(patient);
}

patientCtrl.updatePatient = async (req, res) => {
  const { id } = req.params

  const patient = await PatientModel.findById(id)

  if (!patient) {
    return res.status(404).json({ msg: 'No encontrado' })
  }

  if (patient.vet._id.toString() !== req.vet._id.toString()) {
    return res.json({ msg: 'Acción no válida' })
  }

  //Actualizar paciente

  patient.name = req.body.name || patient.name;
  patient.owner = req.body.owner || patient.owner;
  patient.email = req.body.email || patient.email;
  patient.fehca = req.body.fehca || patient.fehca;
  patient.symptoms = req.body.symptoms || patient.symptoms;


  try {
    const patientUpdated = await patient.save()

    res.json(patientUpdated);

  } catch (error) {
    console.log(error);
  }
}

patientCtrl.deletePatient = async (req, res) => {

    const { id } = req.params

    const patient = await PatientModel.findById(id)
  
    if (!patient) {
      return res.status(404).json({ msg: 'No encontrado' })
    }
  
    if (patient.vet._id.toString() !== req.vet._id.toString()) {
      return res.json({ msg: 'Acción no válida' })
    }

    try {
        await patient.deleteOne()
        res.json({msg: 'Paciente eliminado'})
    } catch (error) {
        console.log(error);

    }

}

export default patientCtrl
