import { IBlogRepo } from '../../src/interfaces/blogRepo.interface';
import Blog from '../../src/types/blog.type';

class BlogRepoMock implements IBlogRepo {
    public createBlog = async (blog: Blog) => {
        return blog;
    };

    public updateBlog = async (blogId: string, description: string) => {
        return {
            _id: blogId,
            description,
        } as Blog;
    };

    public deleteBlog = async (blogId: string) => {
        return {
            _id: blogId,
            description: 'deleted blog',
        } as Blog;
    };

    public getBlog = async (blogId: string) => {
        return {
            _id: blogId,
            description: 'blog',
        } as Blog;
    };

    public getAllBlogs = async () => {
        return [
            {
                _id: '1',
                description: 'test',
            },
        ] as Blog[];
    };
}

export default BlogRepoMock;
