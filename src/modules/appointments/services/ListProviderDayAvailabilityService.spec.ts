import 'reflect-metadata';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

describe('ListProviderDayAvailability', () => {
    let fakeAppointmentRepository: FakeAppointmentRepository;
    let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentRepository);
    });

    it('should be able to list the day availability from provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        await fakeAppointmentRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'provider-id',
            day: 20,
            month: 5,
            year: 2020,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                {
                    hour: 8,
                    available: false,
                },
                {
                    hour: 9,
                    available: false,
                },
                {
                    hour: 10,
                    available: false,
                },
                {
                    hour: 13,
                    available: true,
                },
                {
                    hour: 14,
                    available: false,
                },
                {
                    hour: 15,
                    available: false,
                },
                {
                    hour: 16,
                    available: true,
                },
            ]),
        );
    });
});
