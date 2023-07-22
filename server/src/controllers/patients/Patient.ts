import { Schema, model } from 'mongoose';

interface IPatient {
  name: string;
  mobile: number;
}

const patientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
});

export const Patient = model<IPatient>('Patient', patientSchema);