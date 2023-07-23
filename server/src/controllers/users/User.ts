import { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  userType: {
    User: number;
    Admin: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: { User: { type: Number, default: 0 }, Admin: Number },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    updatedBy: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
