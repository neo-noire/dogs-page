import MockAdapter from 'axios-mock-adapter';
import { useAuth } from './../useAuth';
import { renderHook, waitFor } from '@testing-library/react';
import fetchRequest from '../../utils/axios/axios';
import { vi } from 'vitest';
import mockAxios from 'vitest-mock-axios';






describe('useAuth', () => {

    const server = setupServer(
        // Describe network behavior with request handlers.
        // Tip: move the handlers into their own module and
        // import it across your browser and Node.js setups!
        rest.get('https://frontend-take-home-service.fetch.com/dogs/breeds', (req, res, ctx) => {
            return res(
                ctx.delay(0),
                ctx.status(401),
                ctx.json({
                    message: 'Mocked response JSON body',
                }),
            )
        }),
    )

    // Enable request interception.
    beforeAll(() => server.listen())

    // Reset handlers so that each test could alter them
    // without affecting other, unrelated tests.
    afterEach(() => server.resetHandlers())

    // Don't forget to clean up afterwards.
    afterAll(() => server.close())

    it('should set isAuth to true and error to null when fetchRequest.get succeeds', async () => {


        const result = await renderHook(useAuth)


        await waitFor(() => {

            console.log(result);
        })




    });
});
