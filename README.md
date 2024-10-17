# Patient Health Dashboard

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Backend](#backend)
   - [API Endpoints](#api-endpoints)
   - [Database Schema](#database-schema)
5. [Frontend](#frontend)
   - [Components](#components)
6. [Running Tests](#running-tests)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

The Patient Health Dashboard is a web application designed to help healthcare providers manage patient information and handle prior authorization requests. It provides a user-friendly interface for viewing patient details, medical histories, and submitting authorization requests for treatments.

## Technologies Used

- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, Tailwind CSS
- Testing: Jest, Supertest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/piyushyadav0191/patient-health-dashboard.git
   cd patient-health-dashboard
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGO_URI=mongodb://localhost/patient_health_dashboard
   PORT=5000
   ```
   Create a `.env` file in the `frontend` directory with the following content:
   ```
   BACKEND_URL="http://localhost:5000"
   ```

5. Start the backend server:
   ```
   cd ../backend
   npm start
   ```

6. Start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```

The application should now be running on `http://localhost:5173`

## Backend

### API Endpoints

#### Patients

- `GET /api/patients`: Get all patients
- `GET /api/patients/:id`: Get a specific patient by ID
- `POST /api/patients`: Create a new patient

#### Authorization Requests

- `GET /api/authorizations`: Get all authorization requests
- `POST /api/authorizations`: Create a new authorization request

### Database Schema

#### Patient

```javascript
{
  name: String,
  age: Number,
  condition: String,
  medicalHistory: [String],
  treatmentPlan: String
}
```

#### AuthorizationRequest

```javascript
{
  patientId: ObjectId,
  treatmentType: String,
  insurancePlan: String,
  dateOfService: Date,
  diagnosisCode: String,
  status: String,
  doctorNotes: String
}
```

## Frontend

### Components

1. **PatientList**: Displays a list of all patients with search functionality.
2. **PatientDetail**: Shows detailed information about a specific patient, including their medical history and authorization requests.
3. **PriorAuthorizationForm**: Allows healthcare providers to submit new authorization requests for a patient.

## Running Tests

### Backend Tests

To run backend tests:

```
cd backend
npm test
```

### Frontend Tests

To run frontend tests:

```
cd frontend
npm test
```
# patient-health-dashboard
