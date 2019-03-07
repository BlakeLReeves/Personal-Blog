import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const blogRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

blogRouter.get('/', async (req, res, next) => {
    try {
        let blogs = await DB.Blogs.getAllBlogs();
        res.send(blogs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

blogRouter.get('/:id?', async (req, res, next) => {
    try {
        let id = req.params.id;
        let [blog] = await DB.Blogs.getOneBlog(id);
        res.send(blog);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

blogRouter.delete('/:id', isAdmin, async (req, res, next) => {
    try {
        let id = req.params.id;
        let blog = await DB.Blogs.deleteBlog(id);
        res.json({ message: 'Deleted! '});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

blogRouter.post('/', isAdmin, async (req, res, next) => {
    try {
        let title = req.body.title;
        let content = req.body.content;
        let authorid = req.body.authorid;
        let newBlog = await DB.Blogs.postBlog(title, content, authorid);
        res.send(newBlog);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

blogRouter.put('/:id', isAdmin, async (req, res, next) => {
    try {
        let id = req.params.id;
        let title = req.body.title;
        let content = req.body.content;
        let newBlog = await DB.Blogs.updateBlog(id, title, content);
        res.json({ message: 'Blogged! '});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default blogRouter;