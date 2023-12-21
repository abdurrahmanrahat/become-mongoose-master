import { TStudent } from './student.interface';
import { Student } from './student.model';

// post
const createStudentIntoDb = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); // built in static method

  // instance method.
  const student = new Student(studentData); // create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists.');
  }

  const result = await student.save(); // built in instance method.

  return result;
};

// get
const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

// get/:id
const getStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ _id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getStudentFromDb,
};
