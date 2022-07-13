import Blog from '../types/blog.type';

export interface IBlogService {
    createBlog(blog: Blog): Promise<Blog>;
    updateBlog(blogId: string, description: string): Promise<Blog>;
    deleteBlog(blogId: string): Promise<Blog>;
    getBlog(blogId: string): Promise<Blog>;
    getAllBlogs(): Promise<Blog[]>;
    getBlogsByAuthor(userName: string): Promise<Blog[]>;
}
