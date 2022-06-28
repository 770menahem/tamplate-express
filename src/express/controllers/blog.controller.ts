import { Request, Response } from 'express';
import Blog from '../../types/blog.type';
import * as blogService from '../services/blog.service';

export const createBlog = async (req: Request, res: Response) => {
    try {
        const newBlog = req.body;
        const blog: Blog = await blogService.createBlog(newBlog);
        res.send(blog);
    } catch (error) {
        res.status(400).send({ error });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const description = req.body.description;
        const blog = await blogService.updateBlog(blogId, description);
        res.send(blog);
    } catch (error) {
        res.status(400).send({ error });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.deleteBlog(blogId);
        res.send(blog);
    } catch (error) {
        res.status(400).send({ error });
    }
};

export const getBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.getBlog(blogId);
        res.send(blog);
    } catch (error) {
        res.status(400).send({ error });
    }
};

export const getAllBlogs = async (_req: Request, res: Response) => {
    try {
        const blogs: Blog[] = await blogService.getAllBlogs();
        res.send(blogs);
    } catch (error) {
        res.status(400).send({ error });
    }
};
