const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectDB } = require('../index');
const Patient = require('../models/Patient');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Patient.deleteMany({});
});

beforeEach(async () => {
  await Patient.deleteMany({});
});

describe('Patient API', () => {
  it('should create a new patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({
        name: 'John Doe',
        age: 30,
        condition: 'Healthy',
        medicalHistory: ['Annual checkup'],
        treatmentPlan: 'Regular exercise'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual('John Doe');
  });

  it('should get all patients', async () => {
    await Patient.create({
      name: 'John Doe',
      age: 30,
      condition: 'Healthy',
      medicalHistory: ['Annual checkup'],
      treatmentPlan: 'Regular exercise'
    });

    const res = await request(app).get('/api/patients');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('John Doe');
  });

  it('should get a single patient', async () => {
    const patient = await Patient.create({
      name: 'John Doe',
      age: 30,
      condition: 'Healthy',
      medicalHistory: ['Annual checkup'],
      treatmentPlan: 'Regular exercise'
    });

    const res = await request(app).get(`/api/patients/${patient._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('John Doe');
  });
});