import { IBlogService } from './../src/interfaces/blogService.interface';
import Blog from '../src/types/blog.type';
import initializeMongo from '../src/mongo/initializeMongo';
import { BlogRepo } from '../src/mongo/repo/blog.repo';
import { BlogService } from './../src/express/services/blog.service';
import blogModel from '../src/mongo/models/blog.model';
import config from '../src/config/config';

let blogService: IBlogService;
let createdBlog: Blog;

describe('blog service', () => {
    beforeAll(async () => {
        await initializeMongo(config.mongo.uriTest);
        blogService = new BlogService(new BlogRepo(blogModel));
    });

    beforeEach(async () => {
        await blogModel.deleteMany({});
        createdBlog = await blogService.createBlog({
            title: 'test blog',
            description: 'test blog description',
        });
    });

    test('create blog', async () => {
        const newBlog: Blog = {
            title: 'test',
            description: 'description',
        };
        createdBlog = await blogService.createBlog(newBlog);
        expect(createdBlog?.title).toEqual(newBlog.title);
        expect(createdBlog?.description).toEqual(newBlog.description);
    });

    test('update blog', async () => {
        const blogId = createdBlog._id!;
        const description = 'test update';
        const blog = await blogService.updateBlog(blogId, description);
        expect(blog?.description).toEqual('test update');
    });

    test('delete blog', async () => {
        const blogId = createdBlog._id!;
        await blogService.deleteBlog(blogId);
        const blog = await blogService.getBlog(blogId);
        expect(blog).toEqual(null);
    });

    test('get blog', async () => {
        const blogId = createdBlog._id!;
        const blog = await blogService.getBlog(blogId);
        expect(blog).toBeDefined();
    });
    test('fail to get blog', async () => {
        const blogId = '1';
        const blog = await blogService.getBlog(blogId);
        expect(blog).toBeFalsy();
    });

    test('get all blogs', async () => {
        const blogs = await blogService.getAllBlogs();
        expect(blogs).toBeDefined();
    });
});
