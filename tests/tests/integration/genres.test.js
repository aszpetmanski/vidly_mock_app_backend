import {server} from "../../../index";
import {supertest} from "supertest"



describe('/api/genres', () => {
    beforeEach(() => {server()});
    afterEach(() => {server.close();});

    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await supertest(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });




});