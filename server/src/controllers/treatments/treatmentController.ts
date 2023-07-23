// import { Request, Response } from 'express';
// import { Treatment } from './Treatment';

// export const handleNewTreatment = async (req: Request, res: Response) => {
//   const { name, mobile } = req.body;
//   const role = req.session?.passport?.user._doc.userType;
//   if (req.isAuthenticated() && role.User === 0) {
//     try {
//       const result = await Treatment.create({ name: name, mobile: mobile });
//       res.status(200).json({ message: `New patient ${name} created!` });
//       return result;
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({
//         message: 'Internal server error',
//       });
//     }
//   } else {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// export const getAllTreatments = async (req: Request, res: Response) => {
//   try {
//     if (!req.isAuthenticated()) {
//       res.status(401).json({ message: 'Unauthorized' });
//     } else {
//       const patients = await Treatment.find({});
//       res.status(200).json({ patients });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: 'Internal server error',
//     });
//   }
// };
