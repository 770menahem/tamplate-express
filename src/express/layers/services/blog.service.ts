import Blog from '../../../types/blog.type';
import { IBlogRepo } from '../../../interfaces/blogRepo.interface';
import { IBlogService } from '../../../interfaces/blogService.interface';
import { NotFoundError, NotCreatedError } from '../../utils/error/errors/NotFoundError';

export class BlogService implements IBlogService {
    private BlogRepo: IBlogRepo;
    constructor(blogRepo: IBlogRepo) {
        this.BlogRepo = blogRepo;
    }

    public createBlog = async (blog: Blog) => {
        const newBlog = await this.BlogRepo.createBlog(blog);
        return newBlog;
    };

    public updateBlog = async (blogId: string, description: string) => {
        try {
            const blog = await this.BlogRepo.updateBlog(blogId, description);

            if (!blog) throw new NotFoundError('Blog not found');

            return blog;
        } catch (error) {
            throw new NotCreatedError('Blog not updated: ' + error);
        }
    };

    public deleteBlog = async (blogId: string) => {
        try {
            const blog = await this.BlogRepo.deleteBlog(blogId);

            if (!blog) throw new NotFoundError('Blog not found');

            return blog;
        } catch (error) {
            throw new NotCreatedError('Blog not updated: ' + error);
        }
    };

    public getBlog = async (blogId: string) => {
        const blog = await this.BlogRepo.getBlog(blogId);

        if (!blog) throw new NotFoundError('Blog not found');

        return blog;
    };

    public getAllBlogs = async () => {
        const blogs = await this.BlogRepo.getAllBlogs();

        return blogs || [];
    };

    public getBlogsByAuthor = async (userName: string) => {
        const blogs = await this.BlogRepo.getBlogsByAuthor(userName);

        if (!blogs) throw new NotFoundError('Blogs not found');

        return blogs;
    };
}
