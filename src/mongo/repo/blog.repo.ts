import mongoose from 'mongoose';
import Blog from '../../types/blog.type';

export class BlogRepo {
    private BlogModel: mongoose.Model<Blog>;

    constructor(blogModel: mongoose.Model<Blog>) {
        console.log('BlogRepo created');
        this.BlogModel = blogModel;
    }

    public createBlog = async (blog: Blog): Promise<Blog> => {
        const newBlog = await this.BlogModel.create(blog);
        return newBlog;
    };

    public updateBlog = async (blogId: string, description: string): Promise<Blog | null> => {
        const blog = await this.BlogModel.findByIdAndUpdate(blogId, { description }, { new: true });
        return blog;
    };

    public deleteBlog = async (blogId: string): Promise<Blog | null> => {
        const blog = await this.BlogModel.findByIdAndDelete(blogId);
        return blog;
    };

    public getBlog = async (blogId: string): Promise<Blog | null> => {
        const blog = await this.BlogModel.findById(blogId);
        return blog;
    };

    public getAllBlogs = async (): Promise<Blog[] | null> => {
        const blogs = await this.BlogModel.find({});
        return blogs;
    };
}
