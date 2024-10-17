import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PatientList from '../components/PatientList';

jest.mock('axios');

const mockPatients = [
  { _id: '1', name: 'John Doe', age: 30, condition: 'Healthy', medicalHistory: ['Annual checkup'] },
  { _id: '2', name: 'Jane Smith', age: 45, condition: 'Hypertension', medicalHistory: ['Blood pressure medication'] },
];

describe('PatientList', () => {
  it('renders patient list', async () => {
    axios.get.mockResolvedValue({ data: mockPatients });

    render(
      <Router>
        <PatientList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('filters patients based on search term', async () => {
    axios.get.mockResolvedValue({ data: mockPatients });

    render(
      <Router>
        <PatientList />
      </Router>
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search patients by name or condition...');
      fireEvent.change(searchInput, { target: { value: 'hypertension' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});