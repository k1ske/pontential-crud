import {
    afterAll,
    beforeAll,
    describe,
    expect,
    it
}                      from '@jest/globals';
import {DoneFn}        from '@jest/types/build/Global';
import * as request    from 'supertest';
import App             from '../src/app';
import {Injector}      from '../src/app/Injector';
import DatabaseService from '../src/app/services/DatabaseService';
import {Express}       from 'express';

describe('DeveloperController', () => {
    let app: Express = Injector.resolve<App>(App).getExpressApp();
    
    afterAll(async (done) => {
        await Injector.resolve<DatabaseService>(DatabaseService).close();
        Injector.resolve<App>(App).terminate();
    });
    
    it('GET /developers', async (done: DoneFn | undefined) => {
        const response: any =
                  await request(app)
                      .get('/developers');
        
        expect(response.status).toBe(200);
        expect(response.body?.length).toBeGreaterThan(-1);
        
        done && done();
    });
    
    it('GET /developers?page=1', async (done: DoneFn | undefined) => {
        const response: any =
                  await request(app)
                      .get('/developers?page=1');
        
        expect(response.status).toBe(200);
        expect(response.body?.data?.length).toBeGreaterThan(-1);
        
        done && done();
    });
    
    let developerId: string;
    const developer = {
        nome          : 'Test dev',
        idade         : 18,
        hobby         : 'POG',
        datanascimento: '2002-01-01'
    };
    
    it('POST /developers', async (done: DoneFn | undefined) => {
        const response: any =
                  await request(app)
                      .post('/developers')
                      .send(developer);
        
        expect(response.status).toBe(200);
        expect(response.body?.id).toBeDefined();
        
        developerId = response.body?.id;
        
        done && done();
    });
    
    it('GET /developers/:id', async (done: DoneFn | undefined) => {
        const response: any =
                  await request(app)
                      .get(`/developers/${developerId}`);
        
        expect(response.status).toBe(200);
        expect(response.body?.id).toBeDefined();
        
        done && done();
    });
    
    it('PUT /developers/:id', async (done: DoneFn | undefined) => {
        developer.nome = 'Test dev edit';
        
        const response: any =
                  await request(app)
                      .put(`/developers/${developerId}`)
                      .send(developer);
        
        expect(response.status).toBe(200);
        expect(response.body?.id).toBeDefined();
        
        done && done();
    });
    
    it('DELETE /developers/:id', async (done: DoneFn | undefined) => {
        const response: any =
                  await request(app)
                      .delete(`/developers/${developerId}`);
        
        expect(response.status).toBe(204);
        
        done && done();
    });
});
