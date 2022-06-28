import * as express from 'express';
import { wrapController } from '../wraps';
import * as userController from '../controllers/user.controller';
import { updateSchema, createSchema } from '../joi/validator.schema';
import isAuth from '../../auth/auth';
import validateRequest from '../joi/joi';

const router = express.Router();

// sing in
router.post('/signin', wrapController(userController.signIn));

// authorize user
router.use(isAuth);

// get user
router.get('/:id', wrapController(userController.getUserById));

// create
router.post('', validateRequest(createSchema), wrapController(userController.createUser));

// update
router.put('/:id', validateRequest(updateSchema), wrapController(userController.updateUser));

// delete
router.delete('/:id', wrapController(userController.deleteUser));
