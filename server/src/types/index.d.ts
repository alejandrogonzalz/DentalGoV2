import 'express-session';

declare global {
  // Extend the SessionData interface
  interface SessionData {
    passport?: {
      user: {
        userType: { [key: string]: number };
        [key: string]: any;
      };
    };
  }
  interface IUser {
    name: string;
    email: string;
    password: string;
    userType: {
      User: number;
      Admin: number;
    };
  }
}
