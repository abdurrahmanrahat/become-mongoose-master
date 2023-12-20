import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required.'],
    trim: true,
    maxlength: [20, 'FirstName must contain under 20 words.'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     // if (value !== firstNameStr) {
    //     //   return false;
    //     // }
    //     // return true;
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalarize formet',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid.',
    // },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father Name is required.'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required.'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required.'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required.'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required.'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required.'],
  },
});

// main Schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'ID is required.'], unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid.',
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian Information is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian Information is required.'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active', // set the value of isActive is active.
  },
});

// make model
export const StudentModel = model<Student>('Student', studentSchema);
