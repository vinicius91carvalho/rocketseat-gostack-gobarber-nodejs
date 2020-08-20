import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {

    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ date, provider_id });
        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: {
                date,
            },
        });
        return findAppointment;
    }
}

export default AppointmentsRepository;
