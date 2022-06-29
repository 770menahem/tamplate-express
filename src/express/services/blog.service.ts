import Blog from '../../types/blog.type';
import { BlogRepo } from '../../types/blogRepo.type';

export class BlogService {
    private BlogRepo: BlogRepo;
    constructor(blogRepo: BlogRepo) {
        console.log('BlogService created');
        this.BlogRepo = blogRepo;
    }

    public createBlog = async (blog: Blog) => {
        const newBlog = await this.BlogRepo.createBlog(blog);
        return newBlog;
    };

    public updateBlog = async (blogId: string, description: string) => {
        const blog = await this.BlogRepo.updateBlog(blogId, description);
        return blog;
    };

    public deleteBlog = async (blogId: string) => {
        const blog = await this.BlogRepo.deleteBlog(blogId);
        return blog;
    };

    public getBlog = async (blogId: string) => {
        const blog = await this.BlogRepo.getBlog(blogId);
        return blog;
    };

    public getAllBlogs = async () => {
        const blogs = await this.BlogRepo.getAllBlogs();
        return blogs;
    };
}
