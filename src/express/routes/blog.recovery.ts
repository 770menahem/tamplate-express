import * as express from 'express';
import { wrapController } from '../wraps';
import * as blogController from '../controllers/blog.controller';
import validateRequest from '../joi/joi';
import { updateSchema, createSchema } from '../joi/validator.schema';

const router = express.Router();

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
