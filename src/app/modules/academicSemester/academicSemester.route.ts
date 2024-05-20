import express from 'express';
import router from '../../routes';

const Router = express.Router();

router.post('/create-academicSemester');

export const AcademicSemesterRoutes = Router;
