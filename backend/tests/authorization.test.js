const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectDB } = require('../index');
const AuthorizationRequest = require('../models/AuthorizationRequest');
const Patient = require('../models/Patient');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await AuthorizationRequest.deleteMany({});
  await Patient.deleteMany({});
});


describe('Authorization API', () => {
  it('should create a new authorization request', async () => {
    const patient = await Patient.create({
      name: 'John Doe',
      age: 30,
      condition: 'Healthy',
    });

    const res = await request(app)
      .post('/api/authorizations')
      .send({
        patientId: patient._id,
        treatmentType: 'Surgery',
        insurancePlan: 'Blue Cross',
        dateOfService: '2023-05-01',
        diagnosisCode: 'A00',
        doctorNotes: 'Patient requires immediate attention'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.treatmentType).toEqual('Surgery');
  });

  it('should get all authorization requests', async () => {
    const patient = await Patient.create({
      name: 'John Doe',
      age: 30,
      condition: 'Healthy',
    });

    await AuthorizationRequest.create({
      patientId: patient._id,
      treatmentType: 'Surgery',
      insurancePlan: 'Blue Cross',
      dateOfService: '2023-05-01',
      diagnosisCode: 'A00',
      doctorNotes: 'Patient requires immediate attention'
    });

    const res = await request(app).get('/api/authorizations');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].treatmentType).toEqual('Surgery');
  });
});