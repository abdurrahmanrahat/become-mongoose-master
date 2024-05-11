import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, require: true },
    password: { type: String, require: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // with the help of mongoose timestamps property, take createAt and updatedAt in db
  },
);

// pre save middleware/hook- this middleware call before saving any data in db
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and saved into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// post save middleware/hook- after saving document into db
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
