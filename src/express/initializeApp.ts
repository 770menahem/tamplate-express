import { userModel } from '../mongo/models/user.model';
import { UserRepo } from '../mongo/repo/user.repo';
import { UserService } from './layers/services/user.service';
import { UserController } from './layers/controllers/user.controller';
import UserRouter from './layers/routes/user.route';

import blogModel from '../mongo/models/blog.model';
import { BlogRepo } from '../mongo/repo/blog.repo';
import { BlogService } from './layers/services/blog.service';
import { BlogController } from './layers/controllers/blog.controller';
import BlogRouter from './layers/routes/blog.route';

import Auth from './layers/services/auth.service';

import App from './app';

export default async function initializeApp(port: number) {
    const userRepo = new UserRepo(userModel);
    const blogRepo = new BlogRepo(blogModel);

    const userService = new UserService(userRepo);
    const blogService = new BlogService(blogRepo);

    const userController = new UserController(userService);
    const blogController = new BlogController(blogService);

    const auth = new Auth(userService.auth);

    const userRouter = new UserRouter(userController, auth.check);
    const blogRouter = new BlogRouter(blogController, auth.check);

    const app = new App(port, [userRouter, blogRouter]);

    return app;
}
