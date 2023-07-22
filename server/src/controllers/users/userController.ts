import { Request, Response } from 'express';
import { User } from './User';
import bcrypt from 'bcrypt';

export const handleNewUser = async (req: Request, res: Response) => {
  const { name, email, password, userType } = req.body;
  const role = req.session?.passport?.user._doc.userType;

  if (!email || !password) {
    // check if the credentials are null
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check if the user is authorized and if role exists
  if (req.isAuthenticated() && role.User === 0 && role.Admin === 1) {
    // check for duplicate emails in the db
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) {
      return res.status(409).json({
        message: 'User with that email already exists',
      });
    }
    try {
      // encrypt the password in the database
      const hashedPwd = await bcrypt.hash(password, 10);

      // create and store the new user
      const result = await User.create({
        name: name,
        email: email,
        password: hashedPwd,
        userType: userType,
      });
      res.status(200).json({ message: `New user ${name} created!` });
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const users = await User.find({});
      res.status(200).json({ users });
    }
  } catch (error) {
    console.log(error);
    return res.status(409).json({
      message: 'Internal server error',
    });
  }
};
