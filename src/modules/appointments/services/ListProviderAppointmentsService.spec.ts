import 'reflect-metadata';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

describe('ListProviderAppointments', () => {
    let fakeAppointmentRepository: FakeAppointmentRepository;
    let listProviderAppointmentsService: ListProviderAppointmentsService;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentRepository);
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider-id',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
