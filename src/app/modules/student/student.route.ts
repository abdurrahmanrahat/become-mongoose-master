import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './student.validation';

// will call controller function
const router = express.Router();

// all routes will call controller function

// get route
router.get('/', StudentControllers.getAllStudents);

// get/:id route
router.get('/:id', StudentControllers.getStudent);

// delete route
router.delete('/:id', StudentControllers.deleteStudent);

// update
router.patch(
  '/:id',
  ValidateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
