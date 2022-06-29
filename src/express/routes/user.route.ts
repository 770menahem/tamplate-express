import * as express from 'express';
import { wrapController } from '../utils/wraps';
import { updateSchema, createSchema } from '../joi/validator/user.schema';
import isAuth from '../../auth/auth';
import validateRequest from '../joi/joi';
import { UserController } from '../controllers/user.controller';
import { userModel } from '../../mongo/models/user.model';
import { UserRepo } from '../../mongo/repo/user.repo';
import { UserService } from '../services/user.service';

export const UserS = new UserService(new UserRepo(userModel));
const UserCont = new UserController(UserS);

const userRouter = express.Router();

// sing in
userRouter.post('/login', wrapController(UserCont.login));

// authorize user
userRouter.use(isAuth);

// get user
userRouter.get('/:userId', wrapController(UserCont.getUserById));

// getAll users
userRouter.get('/', wrapController(UserCont.getAllUsers));

// create
userRouter.post('', validateRequest(createSchema), wrapController(UserCont.createUser));

// update
userRouter.put('/:userId', validateRequest(updateSchema), wrapController(UserCont.updateUser));

// delete
userRouter.delete('/:userId', wrapController(UserCont.deleteUser));

export default userRouter;
