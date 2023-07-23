import { Request, Response } from 'express';
// import { Appointment } from './Appointment';

export const handleNewAppointment = async (req: Request, res: Response) => {
  const { start, end } = req.body;
  console.log(start, end);
  const role = req.session?.passport?.user._doc.userType;
  if (req.isAuthenticated() && role.User === 0) {
    // logic tu handle duplicate appointments (THEY MUST NOT COLLIDE)
    try {
    } catch (error) {
      console.error('Error creating new appointment:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
