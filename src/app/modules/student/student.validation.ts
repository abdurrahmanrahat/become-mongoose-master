import Joi from 'joi';

// Joi schema for UserName subdocument
const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized' })
    .messages({
      'string.base': 'First Name must be a string.',
      'string.empty': 'First Name is required.',
      'string.max': 'First Name must contain fewer than {#limit} characters.',
      'string.pattern.name':
        'First Name must start with a capital letter and contain only alphabetic characters.',
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/, { name: 'letters' })
    .messages({
      'string.pattern.base':
        'Last Name must contain only alphabetic characters.',
    }),
});

// Joi schema for Guardian subdocument
const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father Name is required.',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Father Occupation is required.',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Father Contact Number is required.',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Mother Name is required.',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Mother Occupation is required.',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Mother Contact Number is required.',
  }),
});

// Joi schema for LocalGuardian subdocument
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Local Guardian Name is required.',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Local Guardian Occupation is required.',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Local Guardian Contact Number is required.',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Local Guardian Address is required.',
  }),
});

// Joi schema for Student model
const studentJoiSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'ID is required.',
  }),
  name: userNameJoiSchema.required().messages({
    'any.required': 'Name is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of: male, female, other.',
    'any.required': 'Gender is required.',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email is required.',
  }),
  contactNumber: Joi.string().trim().required().messages({
    'string.empty': 'Contact Number is required.',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Emergency Contact Number is required.',
  }),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-'),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present Address is required.',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent Address is required.',
  }),
  guardian: guardianJoiSchema.required().messages({
    'any.required': 'Guardian Information is required.',
  }),
  localGuardian: localGuardianJoiSchema.required().messages({
    'any.required': 'Local Guardian Information is required.',
  }),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentJoiSchema;
