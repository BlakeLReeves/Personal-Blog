import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const blogtagRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

blogtagRouter.get('/:blogid', async (req, res, next) => {
    let id = req.params.blogid;
    try {
        let [tags] = await DB.BlogTags.getBlogTag(id);
        res.send(tags);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

blogtagRouter.post('/', async (req, res, next) => {

    let blogid = req.body.blogid;
    let tagid = req.body.tagid;

    try {
        await DB.BlogTags.insert(blogid, tagid);
        res.json({ message: 'Blogged! '})
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

blogtagRouter.delete('/:blogid', async (req, res, next) => {
    try {
        let blogid = req.params.blogid;
        let blogtag = await DB.BlogTags.deleteBlogTag(blogid);
        res.json({ message: 'Deleted! '})
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default blogtagRouter;