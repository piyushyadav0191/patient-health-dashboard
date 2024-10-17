import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PriorAuthorizationForm from '../components/PriorAuthorizationForm';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useHistory: () => ({ push: jest.fn() }),
}));

const mockPatient = {
  _id: '1',
  name: 'John Doe',
  age: 30,
  condition: 'Healthy',
};

describe('PriorAuthorizationForm', () => {
  it('renders form and submits data', async () => {
    axios.get.mockResolvedValue({ data: mockPatient });
    axios.post.mockResolvedValue({ data: { _id: '1', status: 'pending' } });

    render(
      <Router>
        <PriorAuthorizationForm />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Patient: John Doe')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Treatment Type'), { target: { value: 'Surgery' } });
    fireEvent.change(screen.getByLabelText('Insurance Plan'), { target: { value: 'Blue Cross' } });
    fireEvent.change(screen.getByLabelText('Date of Service'), { target: { value: '2023-05-01' } });
    fireEvent.change(screen.getByLabelText('Diagnosis Code'), { target: { value: 'A00' } });
    fireEvent.change(screen.getByLabelText("Doctor's Notes"), { target: { value: 'Urgent care needed' } });

    fireEvent.click(screen.getByText('Submit Request'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/authorizations', expect.objectContaining({
        treatmentType: 'Surgery',
        insurancePlan: 'Blue Cross',
        dateOfService: '2023-05-01',
        diagnosisCode: 'A00',
        doctorNotes: 'Urgent care needed',
        patientId: '1',
      }));
    });
  });
});