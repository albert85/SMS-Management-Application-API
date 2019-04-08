import request from 'supertest';
import faker from 'faker';

import db from 'models';
import app from 'src';
import { contactDetail, contactDetails, smsDetails } from '../__mocks__/mockData';

describe('SMS API ', () => {

  afterAll(() => {
    app.close();
  })

  describe('Contact endpoint', () => {

    it('should create a contact', (done) => {
      request(app)
        .post('/api/v1/contacts')
        .send(contactDetail)
        .expect(201)
        .end((err, res) => {
          const { message, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Contact successfully created');
          expect(data.name).toEqual(contactDetail.name);
          expect(data.phoneNumber).toEqual(contactDetail.phoneNumber);
          done();
        });
    });

    it('should flag when error occurs', (done) => {
      request(app)
        .post('/api/v1/contacts')
        .expect(400)
        .end((err, res) => {
          const { message, success } = res.body;

          if (err) throw err

          expect(message).toEqual('Creating contact not successfully created');
          expect(success).toEqual(false);
          done();
        });
    });

    it('should retrieve all contacts', (done) => {
      request(app)
        .get('/api/v1/contacts')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Contact successfully retrieved');
          expect(success).toEqual(true);
          expect(data).toHaveLength(1);
          done();
        });
    });
    it('should return error when trying to retrieve all contacts', (done) => {
      request(app)
        .get('/api/v1/contacts')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Contact successfully retrieved');
          expect(success).toEqual(true);
          expect(data).toHaveLength(1);
          done();
        });
    });
  });

  describe('Message endpoint', () => {
    beforeAll(async (done) => {
      await db.Contact.create({
        name: faker.name.firstName(),
        phoneNumber: faker.phone.phoneNumber()
      });
      done();
    })

    it('should create sms messages', async (done) => {
      request(app)
        .post('/api/v1/contacts/sms')
        .send(smsDetails)
        .expect(201)
        .end((err, res) => {
          const { message, success } = res.body;

          if (err) throw err

          expect(message).toEqual('Sms successfully created');
          expect(success).toEqual(true);
          done();
        });

    });
    it('should return error message when creating with invalid params', async (done) => {
      request(app)
        .post('/api/v1/contacts/sms')
        .send()
        .expect(400)
        .end((err, res) => {
          const { message, success } = res.body;

          if (err) throw err

          expect(message).toEqual('Error occured during operation');
          expect(success).toEqual(false);
          done();
        });

    });
    it('should get all sms messages', async (done) => {
      request(app)
        .get('/api/v1/contacts/sms')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Sms successfully retrieved');
          expect(success).toEqual(true);
          expect(data).toHaveLength(1);
          done();
        });

    });
    it('should get all sms messages', async (done) => {
      request(app)
        .get('/api/v1/contacts/sms')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Sms successfully retrieved');
          expect(success).toEqual(true);
          expect(data).toHaveLength(1);
          done();
        });

    });

    it('should get all sent messages by a specific user', async (done) => {
      request(app)
        .get('/api/v1/contacts/1/sent/sms')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Sms successfully retrieved');
          expect(success).toEqual(true);
          expect(data).toHaveLength(1);
          done();
        });
    });

    it('should get all sent messages by a specific user', async (done) => {
      request(app)
        .get('/api/v1/contacts/90/sent/sms')
        .expect(404)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('User message not found');
          expect(success).toEqual(false);
          expect(data).toHaveLength(0);
          done();
        });
    });

    it('should get all sent messages by a specific user', async (done) => {
      request(app)
        .get('/api/v1/contacts/3/received/sms')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('Sms successfully retrieved');
          expect(success).toEqual(true);
          expect(data).toHaveLength(1);
          done();
        });
    });


    it('should get all sent messages by a specific user', async (done) => {
      request(app)
        .get('/api/v1/contacts/90/received/sms')
        .expect(404)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('User message not found');
          expect(success).toEqual(false);
          expect(data).toHaveLength(0);
          done();
        });
    });

    it('should delete messages sent by a specific user', async (done) => {
      request(app)
        .delete('/api/v1/contacts/:senderId/sent/sms/:messageId')
        .expect(200)
        .end((err, res) => {
          const { message, success, data } = res.body;

          if (err) throw err

          expect(message).toEqual('User message not found');
          expect(success).toEqual(false);
          expect(data).toHaveLength(0);
          done();
        });
    });
  })

});

