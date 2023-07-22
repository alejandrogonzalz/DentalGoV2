import { Schema, model, Types } from 'mongoose';

interface IAppointment {
  userId: Types.ObjectId;
  patientId: Types.ObjectId;
  appointmentDate: Date;
}
const appointmentSchema = new Schema<IAppointment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
});

export const Appointment = model<IAppointment>(
  'Appointment',
  appointmentSchema,
);
