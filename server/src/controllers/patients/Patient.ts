import { Schema, model, Types } from 'mongoose';

interface IPatient {
  name: string;
  mobile: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    updatedBy: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export const Patient = model<IPatient>('Patient', patientSchema);
