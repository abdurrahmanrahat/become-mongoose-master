import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // data validation using zod.
    //   const zodParseData = StudentValidationSchema.parse(student);

    // will call service function to send data
    const result = await UserServices.createStudentIntoDb(
      password,
      studentData,
    );

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    // send response
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong.',
      error: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
