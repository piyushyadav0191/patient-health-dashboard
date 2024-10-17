import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PatientDetail from '../components/PatientDetail';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

const mockPatient = {
  _id: '1',
  name: 'John Doe',
  age: 30,
  condition: 'Healthy',
  medicalHistory: ['Annual checkup'],
  treatmentPlan: 'Regular exercise',
};

const mockAuthRequests = [
  { _id: '1', treatmentType: 'Checkup', status: 'approved', dateOfService: '2023-05-01', diagnosisCode: 'Z00.00' },
];

describe('PatientDetail', () => {
  it('renders patient details', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/patients/')) {
        return Promise.resolve({ data: mockPatient });
      } else if (url.includes('/authorizations')) {
        return Promise.resolve({ data: mockAuthRequests });
      }
    });

    render(
      <Router>
        <PatientDetail />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Age: 30')).toBeInTheDocument();
      expect(screen.getByText('Condition: Healthy')).toBeInTheDocument();
      expect(screen.getByText('Annual checkup')).toBeInTheDocument();
      expect(screen.getByText('Regular exercise')).toBeInTheDocument();
      expect(screen.getByText('Checkup')).toBeInTheDocument();
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });
  });
});