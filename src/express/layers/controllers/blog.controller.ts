import { IBlogService } from '../../../interfaces/blogService.interface';
import { Request, Response } from 'express';
import Blog from '../../../types/blog.type';
import { IBlogController } from '../../../interfaces/blogController.interface';
export class BlogController implements IBlogController {
    private blogService: IBlogService;

    constructor(blogService: IBlogService) {
        this.blogService = blogService;
    }

    public createBlog = async (req: Request, res: Response) => {
        const newBlog = req.body;
        const blog: Blog = await this.blogService.createBlog(newBlog);

        res.send(blog);
    };

    public updateBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const description = req.body.description;
        const blog: Blog = await this.blogService.updateBlog(blogId, description);

        res.send(blog);
    };

    public deleteBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const blog: Blog = await this.blogService.deleteBlog(blogId);

        res.send({ msg: 'Blog deleted successfully', blog });
    };

    public getBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const blog: Blog = await this.blogService.getBlog(blogId);

        res.send(blog);
    };

    public getAllBlogs = async (_req: Request, res: Response) => {
        const blogs: Blog[] = await this.blogService.getAllBlogs();

        res.send(blogs);
    };

    public getBlogsByAuthor = async (req: Request, res: Response) => {
        const userName = req.params.userName;
        const blogs: Blog[] = await this.blogService.getBlogsByAuthor(userName);

        res.send(blogs);
    };
}
