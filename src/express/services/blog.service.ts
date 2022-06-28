import Blog from '../../types/blog.type';
import * as blogRepo from '../../mongo/repo/blog.repo';

export const createBlog = async (blog: Blog) => {
    const newBlog = await blogRepo.createBlog(blog);
    return newBlog;
};

export const updateBlog = async (blogId: string, description: string) => {
    const blog = await blogRepo.updateBlog(blogId, description);
    return blog;
};

export const deleteBlog = async (blogId: string) => {
    const blog = await blogRepo.deleteBlog(blogId);
    return blog;
};

export const getBlog = async (blogId: string) => {
    const blog = await blogRepo.getBlog(blogId);
    return blog;
};

export const getAllBlogs = async () => {
    const blogs = await blogRepo.getAllBlogs();
    return blogs;
};
