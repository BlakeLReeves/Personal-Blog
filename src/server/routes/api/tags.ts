import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const tagRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

tagRouter.get('/:id?', async (req, res, next) => {
    try {
        let id = req.params.id;
        if (id) {
            let tag = await DB.Tags.getOneTag(id);
            res.send(tag);
        } else {
            let tags = await DB.Tags.getAllTags();
            res.send(tags);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default tagRouter;