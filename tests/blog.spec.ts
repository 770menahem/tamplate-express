// test blogService with jest
import * as blogService from '../src/express/services/blog.service';
import Blog from '../src/types/blogType';
import initializeMongo from '../src/mongo/initializeMongo';

let createdBlog: Blog;
describe('blog service', () => {
    beforeAll(async () => {
        await initializeMongo();
    });

    beforeEach(async () => {
        createdBlog = await blogService.createBlog({
            name: 'test blog',
            description: 'test blog description',
        });
    });

    test('create blog', async () => {
        const newBlog: Blog = {
            name: 'test',
            description: 'description',
        };
        createdBlog = await blogService.createBlog(newBlog);
        expect(createdBlog).toBeDefined();
    });

    test('update blog', async () => {
        const blogId = createdBlog._id!;
        const description = 'test';
        const blog = await blogService.updateBlog(blogId, description);
        expect(blog).toBeDefined();
    });

    test('delete blog', async () => {
        const blogId = createdBlog._id!;
        const blog = await blogService.deleteBlog(blogId);
        expect(blog).toBeDefined();
    });

    test('create blog', async () => {
        const newBlog: Blog = {
            name: 'test',
            description: 'test',
        };
        createdBlog = await blogService.createBlog(newBlog);
        expect(createdBlog).toBeDefined();
    });

    test('get blog', async () => {
        const blogId = createdBlog._id!;
        const blog = await blogService.getBlog(blogId);
        expect(blog).toBeDefined();
    });

    test('get all blogs', async () => {
        const blogs = await blogService.getAllBlogs();
        expect(blogs).toBeDefined();
    });
});
