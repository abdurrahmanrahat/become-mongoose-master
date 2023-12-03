import { Student } from './student.interface';
import { StudentModel } from './student.model';

// post
const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// get
const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

// get/:id
const getStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getStudentFromDb,
};
