import { Request, Response } from 'express';
import db from '../db';
const User = db.user;


export const create = (req: Request, res: Response): void => {

  try {
    const { username, password } = req.body;

    const user = new User(req.body);

    user.save()
      .then((data: object) => {
        console.log("Data saved: ", data);
        res.status(200).send(data);
      })
      .catch((err: Error) => {
        console.error("Error in saving: ", err);
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } catch (err) {
    console.error("General Error: ", err);
    res.status(500).json(err);
  }
};


export const getAll = (req: Request, res: Response): void => {
 
  try {
    User.find({})
      .then((data: object) => {
        res.status(200).send(data);
      })
      .catch((err: { message: object }) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = (req: Request, res: Response): void => {
  try {
   const username = req.params.username;
    User.find({ username })
      .then((data: object) => {
        res.status(200).send(data);
      })
      .catch((err: { message: object }) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  
  try {
    const username = req.params.username;

    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }

    const password = req.body.password;
    

    if (password.error) {
      res.status(400).send({ message: password.error });
      return;
    }

    const user = await User.findOne({ username }).exec();

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    user.username = username;
    user.password = password;
    user.displayName = req.body.displayName;
    user.info = req.body.info;
    user.profile = req.body.profile;

    await user.save();
    res.status(204).send();
  
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Some error occurred while processing your request.' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
 
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).json({ message: 'Invalid Username Supplied' });
      return;
    }

    const result = await User.deleteOne({ username }).exec();

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(204).send();
  
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the user.' });
  }
};

export default {
    create,
    getAll,
    getUser,
    updateUser,
    deleteUser
    };