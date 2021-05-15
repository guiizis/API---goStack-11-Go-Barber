import { Router } from 'express'
import { parseISO } from "date-fns"
import { getCustomRepository } from "typeorm"
import appointmentRepository from '../repositories/AppointmentRepository'
import createAppointmentService from '../services/CreateAppointmentsService'
import { ensaureAuthenticated } from '../middlewares/ensureAuthenticated'

const appointRouter = Router()

appointRouter.use(ensaureAuthenticated)

appointRouter.get("/", async (req, res) => {

  const appointRepo = getCustomRepository(appointmentRepository)
  const allAppointments = await appointRepo.find()
  return res.status(200).json(allAppointments)
}
)

appointRouter.post("/", async (req, res) => {
  try {
    const newCreateAppointmentService = new createAppointmentService()

    const { provider_id, date } = req.body

    const parseDate = parseISO(date)

    const newApointment = await newCreateAppointmentService.execute({ provider_id, date: parseDate })

    return res.status(201).json(newApointment)

  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

export default appointRouter
