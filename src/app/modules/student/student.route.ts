import express from 'express';
import { StudentControllers } from './student.controller';

// will call controller function
const router = express.Router();

// call controller function
router.post('/create-student', StudentControllers.createStudent);

// get route
router.get('/', StudentControllers.getAllStudents);

// get/:id route
router.get('/:id', StudentControllers.getStudent);

export const StudentRoutes = router;
