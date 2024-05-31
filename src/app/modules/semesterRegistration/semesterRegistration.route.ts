import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  ValidateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);

router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

// router.patch(
//   '/:id',
//   ValidateRequest(updateFacultyValidationSchema),
//   FacultyControllers.updateFaculty,
// );

router.delete(
  '/:id',
  SemesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
