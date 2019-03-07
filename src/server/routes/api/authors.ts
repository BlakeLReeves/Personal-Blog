import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const authorRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

authorRouter.get('/:id?', async (req, res, next) => {
    try {
        let id = req.params.id;
        if (id) {
            let author = await DB.Authors.getOneAuthor(id);
            res.send(author);
        } else {
            let authors = await DB.Authors.getAllAuthors();
            res.send(authors);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

authorRouter.post('/', async (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let newAuthor = await DB.Blogs.postBlog(name, email, password);
        res.json({ message: 'Blogged! '})
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default authorRouter;