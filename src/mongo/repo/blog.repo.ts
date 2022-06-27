import Blog from '../../types/blogType';
import blogModel from '../model';

export const createBlog = async (blog: Blog) => {
    const newBlog = await blogModel.create(blog);
    return newBlog;
};

export const updateBlog = async (blogId: string, description: string) => {
    const blog = await blogModel.findByIdAndUpdate(blogId, { description });
    return blog;
};

export const deleteBlog = async (blogId: string) => {
    const blog = await blogModel.findByIdAndDelete(blogId);
    return blog;
};

export const getBlog = async (blogId: string) => {
    const blog = await blogModel.findById(blogId);
    return blog;
};

export const getAllBlogs = async () => {
    const blogs = await blogModel.find({});
    return blogs;
};
