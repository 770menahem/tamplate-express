import * as express from 'express';
import { wrapController } from '../utils/wraps';
import * as userController from '../controllers/user.controller';
import { updateSchema, createSchema } from '../joi/validator/user.schema';
// import isAuth from '../../auth/auth';
import validateRequest from '../joi/joi';

const userRouter = express.Router();

// sing in
userRouter.post('/login', wrapController(userController.login));

// authorize user
// userRouter.use(isAuth);

// get user
userRouter.get('/:userId', wrapController(userController.getUserById));

// getAll users
userRouter.get('/', wrapController(userController.getAllUsers));

// create
userRouter.post('', validateRequest(createSchema), wrapController(userController.createUser));

// update
userRouter.put('/:userId', validateRequest(updateSchema), wrapController(userController.updateUser));

// delete
userRouter.delete('/:userId', wrapController(userController.deleteUser));

export default userRouter;
