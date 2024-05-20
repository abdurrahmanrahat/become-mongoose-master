import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import router from '../../routes';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';

const Router = express.Router();

router.post(
  '/create-academicSemester',
  ValidateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = Router;
