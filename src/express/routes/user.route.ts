import * as express from 'express';
import { wrapController } from '../wraps';
import * as userController from '../controllers/user.controller';
import { updateSchema, createSchema } from '../joi/validator/user.schema';
import isAuth from '../../auth/auth';
import validateRequest from '../joi/joi';

const userRouter = express.Router();

// sing in
userRouter.post('/signin', wrapController(userController.signIn));

// authorize user
userRouter.use(isAuth);

// get user
userRouter.get('/:id', wrapController(userController.getUserById));

// create
userRouter.post('', validateRequest(createSchema), wrapController(userController.createUser));

// update
userRouter.put('/:id', validateRequest(updateSchema), wrapController(userController.updateUser));

// delete
userRouter.delete('/:id', wrapController(userController.deleteUser));

export default userRouter;
