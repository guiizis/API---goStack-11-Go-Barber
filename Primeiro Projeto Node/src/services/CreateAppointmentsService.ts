import { startOfHour } from 'date-fns'
import { getCustomRepository } from "typeorm"
import AppointmentModel from "../models/Appointment"
import AppointmentRepository from "../repositories/AppointmentRepository"

interface IRequest {
  provider_id: string,
  date: Date
}

class createAppointmentService {

  public async execute({ provider_id, date }: IRequest): Promise<AppointmentModel> {
    const appointmentRepositoryInstance = getCustomRepository(AppointmentRepository)

    const appointmentHour = startOfHour(date)

    const findAppointmentInTheSameTime = await appointmentRepositoryInstance.findByDate(appointmentHour)

    if (findAppointmentInTheSameTime) {
      throw new Error("The Instace of this Data  Already Exist !")
    }

    const createdAppointment = appointmentRepositoryInstance.create({ //criando instancia para ser salva no BD
      provider_id,
      date: appointmentHour
    })

    const savedAppointment = await appointmentRepositoryInstance.save(createdAppointment) //salvando de fato a instancia

    return savedAppointment

  }

}

export default createAppointmentService
