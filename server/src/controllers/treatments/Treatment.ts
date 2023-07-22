import { Schema, model, Types } from 'mongoose';

interface ITreatment {
  appointmentId: Types.ObjectId;
  description: string;
}
const treatmentSchema = new Schema<ITreatment>({
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  description: { type: String, required: true },
});

export const Treatment = model<ITreatment>('Treatment', treatmentSchema);
