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
router.get('/:studentId', StudentControllers.getStudent);

// delete route
router.delete('/:studentId', StudentControllers.deleteStudent);

// update
router.patch(
  '/:studentId',
  ValidateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
