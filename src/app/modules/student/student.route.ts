import express from 'express';
import { StudentControllers } from './student.controller';

// will call controller function
const router = express.Router();

// all routes will call controller function

// get route
router.get('/', StudentControllers.getAllStudents);

// get/:id route
router.get('/:studentId', StudentControllers.getStudent);

// delete route
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
