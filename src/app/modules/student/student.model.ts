import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is required.'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'UserId is required.'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid.',
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email type',
      // },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      // to get data with json format, make true the virtuals.
      virtuals: true,
    },
  },
);

//----------- query middleware
studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } }); // find the current query.
  next();
});

studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } }); // find the current query.
  next();
});

// [ {$match: {isDeleted: {$ne: true}}} ,{ '$match': { id: '688' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//----------- mongoose virtual.
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//----------- creating a custom static method.
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//------------ creating a custom instance method.
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

// make model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
