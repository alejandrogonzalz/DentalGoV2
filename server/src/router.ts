import { Router } from 'express';
import { router as authRouter } from './controllers/auth/authController';
import { handleNewUser, getAllUsers, updateUser } from './controllers/users/userController';
import {
  handleNewPatient,
  getAllPatients,
  updatePatient,
} from './controllers/patients/patientController';
// import { handleNewTreatment, getAllTreatments } from './controllers/treatments/treatmentController';
import { handleNewAppointment } from './controllers/appointments/appointmentController';

const router = Router();

// --------- auth routes ---------- //
router.use('/auth', authRouter);

// --------- User routes ---------- //
router.post('/create-user', handleNewUser);
router.get('/getAllUsers', getAllUsers);
router.post('/update-user', updateUser);

// --------- Patient routes ---------- //
router.post('/create-patient', handleNewPatient);
router.get('/getAllPatients', getAllPatients);
router.post('/update-patient', updatePatient);

// --------- User routes ---------- //
router.post('/NOTWORKINGALREADY', handleNewAppointment);

export default router;
