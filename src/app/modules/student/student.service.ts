import { Student } from './student.model';

// get
const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// get/:id
const getStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.findById({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
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
