import 'reflect-metadata';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

describe('ListProviderMonthAvailability', () => {
    let fakeAppointmentRepository: FakeAppointmentRepository;
    let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentRepository);
    });

    it('should be able to list the month availability from provider', async () => {
        // eslint-disable-next-line no-plusplus
        for (let hour = 8; hour < 18; hour++) {
            // eslint-disable-next-line no-await-in-loop
            await fakeAppointmentRepository.create({
                provider_id: 'provider-id',
                user_id: 'user-id',
                date: new Date(2020, 4, 20, hour, 0, 0),
            });
        }

        await fakeAppointmentRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailabilityService.execute({
            provider_id: 'provider-id',
            year: 2020,
            month: 5,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                {
                    day: 19,
                    available: true,
                },
                {
                    day: 20,
                    available: false,
                },
                {
                    day: 21,
                    available: true,
                },
                {
                    day: 22,
                    available: true,
                },
            ]),
        );
    });
});
