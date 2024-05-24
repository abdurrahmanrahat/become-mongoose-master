import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    data: result,
  });
});

const getStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.getStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentIntoDb(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
};
