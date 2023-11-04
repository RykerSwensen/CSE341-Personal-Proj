// Branch in Progress for Sets


import { Request, Response } from 'express';
import db from '../db';
const Sets = db.user;


export const create = (req: Request, res: Response): void => {

  try {

    const sets = new Sets(req.body);

    sets.save()
      .then((data: object) => {
        console.log("Data saved: ", data);
        res.status(200).send(data);
      })
      .catch((err: Error) => {
        console.error("Error in saving: ", err);
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the set.'
        });
      });
  } catch (err) {
    console.error("General Error: ", err);
    res.status(500).json(err);
  }
};


export const getAll = (req: Request, res: Response): void => {
  try {
    Sets.find({})
      .then((data: object) => {
        res.status(200).send(data);
      })
      .catch((err: { message: object }) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the sets.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSets = (req: Request, res: Response): void => {
  try {
   const sets = req.params.sets;
    Sets.find({ sets })
      .then((data: object) => {
        res.status(200).send(data);
      })
      .catch((err: { message: object }) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the set.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};


export const updateSets = async (req: Request, res: Response) => {
  
    try {
      const sets = req.params.sets;
  
      if (!sets) {
        res.status(400).send({ message: 'Invalid Username Supplied' });
        return;
      }
  
      
      const set = await Sets.findOne({ sets }).exec();
      set.setName = req.body.setName; 
      set.startDate = req.body.startDate;
      set.endDate = req.body.endDate;
  
      await set.save();
      res.status(204).send();
    
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Some error occurred while processing your request.' });
    }
  };

export const deleteSets = async (req: Request, res: Response): Promise<void> => {
  try {
    const sets = req.params.sets;
    if (!sets) {
      res.status(400).json({ message: 'Invalid Set Name Supplied' });
      return;
    }

    const result = await Sets.deleteOne({ sets }).exec();

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Set not found' });
      return;
    }
    
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the set.' });
  }
};

export default {
    create,
    getAll,
    getSets,
    updateSets,
    deleteSets
    };