import 'express-session';
// import { Types } from 'mongoose';

// Interface extension of SessionData
declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: {
        userType: { [key: string]: number };
        [key: string]: any;
      };
    };
  }
}

// global declarations
// declare global {
//   interface IUser {
//     name: string;
//     email: string;
//     password: string;
//     userType: {
//       User: number;
//       Admin: number;
//     };
//   }
//   interface IPatient {
//     name: string;
//     mobile: number;
//   }

//   interface ITreatment {
//     appointmentId: Types.ObjectId;
//     description: string;
//   }
//   interface IAppointment {
//     userId: Types.ObjectId;
//     patientId: Types.ObjectId;
//     appointmentDate: Date;
//   }
// }
