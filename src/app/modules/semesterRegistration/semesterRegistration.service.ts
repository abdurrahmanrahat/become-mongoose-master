import { TSemesterRegistration } from './semesterRegistration.interface';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  // check if the semester is exist
  if (payload.academicSemester) {
    //
  }
};

const getAllSemesterRegistrationsFromDb = async () => {};

const getSingleSemesterRegistrationFromDb = async (id: string) => {};

const updateSemesterRegistrationIntoDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationsFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistrationIntoDb,
};
