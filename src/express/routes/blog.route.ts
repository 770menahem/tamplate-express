import { BlogController } from './../controllers/blog.controller';
import * as express from 'express';
import { wrapController } from '../utils/wraps';
import validateRequest from '../joi/joi';
import { updateSchema, createSchema } from '../joi/validator/blog.schema';
import isAuth from '../../auth/auth';
import { BlogService } from '../services/blog.service';
import { BlogRepo } from '../../mongo/repo/blog.repo';
import blogModel from '../../mongo/models/blog.model';

const BlogCont = new BlogController(new BlogService(new BlogRepo(blogModel)));
const router = express.Router();

// authorize user
router.use(isAuth);

// get all
router.get('', wrapController(BlogCont.getAllBlogs));
// get by id
router.get('/:id', wrapController(BlogCont.getBlog));
// create
router.post('', validateRequest(createSchema), wrapController(BlogCont.createBlog));
// update
router.put('/:id', validateRequest(updateSchema), wrapController(BlogCont.updateBlog));
// delete
router.delete('/:id', wrapController(BlogCont.deleteBlog));

export default router;
