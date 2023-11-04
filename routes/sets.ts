import express from 'express';
import setsController from '../controller/sets'

const setsRouter = express.Router();
    setsRouter.get('/', setsController.getAll);
    setsRouter.get('/:setname', setsController.getSets);
    setsRouter.post('/', setsController.create);
    setsRouter.put('/:setname', setsController.updateSets);
    setsRouter.delete('/:setname', setsController.deleteSets);

export default setsRouter;