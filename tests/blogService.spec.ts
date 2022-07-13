import { IBlogService } from '../src/interfaces/blogService.interface';
import Blog from '../src/types/blog.type';
import { BlogService } from '../src/express/layers/services/blog.service';
import BlogRepoMock from './mocks/blogRepo';
import { NotFoundError } from '../src/express/utils/error/errors/NotFoundError';

let blogService: IBlogService;

jest.setTimeout(60000);

describe('blog service', () => {
    beforeEach(async () => {
        const rep = new BlogRepoMock();
        blogService = new BlogService(rep);
        await rep.createBlog({
            _id: '1',
            title: 'title1',
            description: 'description',
            author: 'test author',
        });
        await rep.createBlog({
            _id: '2',
            title: 'title1',
            description: 'description',
            author: 'test author',
        });
    });

    test('create blog', async () => {
        const newBlog: Blog = {
            _id: '3',
            title: 'test',
            description: 'description',
            author: 'test author',
        };
        const createdBlog = await blogService.createBlog(newBlog);
        expect(createdBlog?.title).toEqual(newBlog.title);
        expect(createdBlog?.description).toEqual(newBlog.description);
    });

    test('update blog', async () => {
        const blogId = '1';
        const description = 'test update';
        const blog = await blogService.updateBlog(blogId, description);
        expect(blog?.description).toEqual('test update');
    });

    test('delete blog', async () => {
        const blogId = '2';
        await blogService.deleteBlog(blogId);
        try {
            await blogService.getBlog(blogId);
            expect(true).toBeFalsy();
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    test('get blog', async () => {
        const blogId = '1';
        const blog = await blogService.getBlog(blogId);
        expect(blog).toBeDefined();
    });
    test('fail to get blog', async () => {
        const blogId = '4';
        try {
            await blogService.getBlog(blogId);
            expect(true).toBeFalsy();
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    test('get all blogs', async () => {
        const blogs = await blogService.getAllBlogs();
        expect(blogs).toBeDefined();
    });

    test('get blogs by author', async () => {
        const userName = 'test author';
        const blogs = await blogService.getBlogsByAuthor(userName);
        expect(blogs).toBeDefined();
    });
});
