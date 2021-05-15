
import Appointment from '../models/Appointment'
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Appointment)
class ApointmentRepository extends Repository<Appointment> {

  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentById = await this.findOne({
      where: ({ date })
    })
    return appointmentById || null
  }
}

export default ApointmentRepository
