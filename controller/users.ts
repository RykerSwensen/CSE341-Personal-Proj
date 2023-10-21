import { Request, Response } from 'express';
import db from '../db';
const mongodb = require('../db/connect');
const User = db.user;
import * as usernameValidator from '../utilities/usernameValidation';

export const create = (req: Request, res: Response): void => {

  try {
    const { username, password } = req.body;

    // Error checking for empty fields
    if (!username || !password) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }

    const usernameValid = usernameValidator.passwordPass(username);

    if (usernameValid.error) {
      res.status(400).send({ message: usernameValid.error});
      return;
    }


    const user = new User(req.body);

    user.save()
      .then((data: object) => {
        console.log("Data saved: ", data);
        res.status(201).send(data);
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

   if (!username) {
    res.status(400).send({ message: 'Invalid Username Supplied' });
    return;
  }

    User.find({ username })
      .then((data: object) => {
        if (!data)
          res.status(404).send({ message: 'Not found user with username ' + username });
        else
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
    const user = await User.findOne({ username }).exec();
    user.username = username;
    user.password = password;
    user.displayName = req.body.displayName;
    user.email = req.body.email;
    user.joinDate = req.body.joinDate;

    await user.save();
    res.status(204).send();
  
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Some error occurred while processing your request.' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const username = req.params.username;
  const response = await mongodb.getDb().db().collection('users').deleteUser({username: username}, true)
  console.log(response);
  if(response.deletedCount > 0) {
    res.status(200).send({ message: 'User deleted successfully' });
  }
  else {
    res.status(404).send({ message: 'User not found' });
  }
 
};

export default {
    create,
    getAll,
    getUser,
    updateUser,
    deleteUser
    };