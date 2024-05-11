import { Student } from './student.model';

// get
const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

// get/:id
const getStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete/:id
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDb,
  getStudentFromDb,
  deleteStudentFromDb,
};
