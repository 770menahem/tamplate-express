import * as express from 'express';
import { wrapController } from '../utils/wraps';
import * as blogController from '../controllers/blog.controller';
import validateRequest from '../joi/joi';
import { updateSchema, createSchema } from '../joi/validator/blog.schema';
import isAuth from '../../auth/auth';
const router = express.Router();

// authorize user
router.use(isAuth);

// get all
router.get('', wrapController(blogController.getAllBlogs));
// get by id
router.get('/:id', wrapController(blogController.getBlog));
// create
router.post('', validateRequest(createSchema), wrapController(blogController.createBlog));
// update
router.put('/:id', validateRequest(updateSchema), wrapController(blogController.updateBlog));
// delete
router.delete('/:id', wrapController(blogController.deleteBlog));

export default router;
