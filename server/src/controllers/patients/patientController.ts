import { Request, Response } from 'express';
import { Patient } from './Patient';
// import { Types } from 'mongoose';

export const handleNewPatient = async (req: Request, res: Response) => {
  const { name, mobile } = req.body;
  const role = req.session?.passport?.user._doc.userType;
  const userId = req.session?.passport?.user._doc._id;

  if (req.isAuthenticated() && role.User === 0) {
    const duplicate = await Patient.findOne({ mobile }).exec();
    if (duplicate) {
      return res.status(409).json({
        message: 'Patient with that phone already exists',
      });
    }
    try {
      const newPatient = {
        name: name,
        mobile: mobile,
        createdBy: userId,
        updatedBy: userId,
      };
      const result = await Patient.create(newPatient);
      console.log(result);
      res.status(200).json({ message: `New patient ${name} created!` });
      return result;
    } catch (error) {
      console.error('Error creating new patient:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const patients = await Patient.find({});
      res.status(200).json({ patients });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  const { name, mobile, _id } = req.body;
  const role = req.session?.passport?.user._doc.userType;
  const userId = req.session?.passport?.user._doc._id;

  // findByIdAndUpdate parameters
  const update = { name, mobile, updatedBy: userId };
  const options = { new: true };

  if (req.isAuthenticated() && role.User === 0 && role.Admin === 1) {
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(_id, update, options);
      if (updatedPatient) {
        res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
    } catch (error) {
      console.error('Error creating new patient:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
