import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
};
