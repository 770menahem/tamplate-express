import { Request, Response } from 'express';
import Blog from '../../types/blog.type';
import { BlogService } from '../../types/blogService.type';
// import * as blogService from '../services/blog.service';

// export const createBlog = async (req: Request, res: Response) => {
//     const newBlog = req.body;
//     const blog: Blog = await blogService.createBlog(newBlog);
//     if (!blog) res.status(404).send({ error: 'fail to create blog' });
//     else res.send(blog);
// };

// export const updateBlog = async (req: Request, res: Response) => {
//     const blogId = req.params.id;
//     const description = req.body.description;
//     const blog: Blog | null = await blogService.updateBlog(blogId, description);
//     if (!blog) res.status(404).send({ error: 'fail to update blog' });
//     else res.send(blog);
// };

// export const deleteBlog = async (req: Request, res: Response) => {
//     const blogId = req.params.id;
//     const blog: Blog | null = await blogService.deleteBlog(blogId);
//     if (!blog) res.status(404).send({ error: 'fail to delete blog' });
//     else res.send({ msg: 'Blog deleted successfully', blog });
// };

// export const getBlog = async (req: Request, res: Response) => {
//     const blogId = req.params.id;
//     const blog: Blog | null = await blogService.getBlog(blogId);
//     if (!blog) res.status(404).send('blog not found');
//     else res.send(blog);
// };

// export const getAllBlogs = async (_req: Request, res: Response) => {
//     const blogs: Blog[] | null = await blogService.getAllBlogs();
//     if (!blogs) res.status(404).send({ error: 'fail to get all blogs' });
//     else res.send(blogs);
// };

export class BlogController {
    private BlogService: BlogService;

    constructor(BlogService: BlogService) {
        console.log('BlogController created');
        this.BlogService = BlogService;
    }

    public createBlog = async (req: Request, res: Response) => {
        const newBlog = req.body;
        const blog: Blog = await this.BlogService.createBlog(newBlog);
        if (!blog) res.status(404).send({ error: 'fail to create blog' });
        else res.send(blog);
    };

    public updateBlog = async (req: Request, res: Response) => {
        const blogId = req.params.id;
        const description = req.body.description;
        const blog: Blog | null = await this.BlogService.updateBlog(blogId, description);
        if (!blog) res.status(404).send({ error: 'fail to update blog' });
        else res.send(blog);
    };

    public deleteBlog = async (req: Request, res: Response) => {
        const blogId = req.params.id;
        const blog: Blog | null = await this.BlogService.deleteBlog(blogId);
        if (!blog) res.status(404).send({ error: 'fail to delete blog' });
        else res.send({ msg: 'Blog deleted successfully', blog });
    };

    public getBlog = async (req: Request, res: Response) => {
        const blogId = req.params.id;
        const blog: Blog | null = await this.BlogService.getBlog(blogId);
        if (!blog) res.status(404).send('blog not found');
        else res.send(blog);
    };

    public getAllBlogs = async (_req: Request, res: Response) => {
        const blogs: Blog[] | null = await this.BlogService.getAllBlogs();
        if (!blogs) res.status(404).send({ error: 'fail to get all blogs' });
        else res.send(blogs);
    };
}
