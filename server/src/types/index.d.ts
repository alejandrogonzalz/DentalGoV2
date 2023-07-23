import 'express-session';

interface ExtendedUser {
  userType: { [key: string]: number };
  name: string;
  email: string;
  [key: string]: any;
}

// Interface extension of SessionData
declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: ExtendedUser;
    };
  }
}
