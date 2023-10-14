// Branch in Progress for Sets


// import { Request, Response } from 'express';
// import db from '../db';
// const Sets = db.sets;


// export const create = (req: Request, res: Response): void => {

//   try {

//     const sets = new Sets(req.body);

//     sets.save()
//       .then((data: object) => {
//         console.log("Data saved: ", data);
//         res.status(200).send(data);
//       })
//       .catch((err: Error) => {
//         console.error("Error in saving: ", err);
//         res.status(500).send({
//           message: err.message || 'Some error occurred while creating the set.'
//         });
//       });
//   } catch (err) {
//     console.error("General Error: ", err);
//     res.status(500).json(err);
//   }
// };


// export const getAll = (req: Request, res: Response): void => {
//   try {
//     Sets.find({})
//       .then((data: object) => {
//         res.status(200).send(data);
//       })
//       .catch((err: { message: object }) => {
//         res.status(500).send({
//           message: err.message || 'Some error occurred while retrieving the sets.'
//         });
//       });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const getSets = (req: Request, res: Response): void => {
//   try {
//    const sets = req.params.sets;
//     Sets.find({ sets })
//       .then((data: object) => {
//         res.status(200).send(data);
//       })
//       .catch((err: { message: object }) => {
//         res.status(500).send({
//           message: err.message || 'Some error occurred while retrieving the set.'
//         });
//       });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const updateSets = async (req: Request, res: Response) => {
  
//   try {

//     const sets = await Sets.findOne({ sets }).exec();

//     if (!user) {
//       res.status(404).send({ message: 'User not found' });
//       return;
//     }

//     // Update user properties here
//     user.username = username;
//     user.password = password;
//     user.displayName = req.body.displayName;
//     user.info = req.body.info;
//     user.profile = req.body.profile;

//     await user.save();
//     res.status(204).send();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Some error occurred while processing your request.' });
//   }
// };

// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   // DELETE USER
// // #swagger.description = 'Endpoint to delete a user by username.'
// /* #swagger.parameters['username'] = {
//   in: 'path',
//   description: 'Username of the user to delete.',
//   required: true,
//   type: 'string'
// } */
//   try {
//     const username = req.params.username;
//     if (!username) {
//       res.status(400).json({ message: 'Invalid Username Supplied' });
//       return;
//     }

//     const result = await User.deleteOne({ username }).exec();

//     if (result.deletedCount === 0) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
    
//     res.status(204).send();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Some error occurred while deleting the user.' });
//   }
// };

// export default {
//     create,
//     getAll,
//     getSet,
//     updateSet,
//     deleteSet
//     };