import * as express from 'express';
import { charge } from '../../utils/stripe/donations';
import { RequestHandler } from 'express-serve-static-core';

const donateRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

donateRouter.post('/', async (req, res, next) => {
    try {
        await charge(req.body.token.id, req.body.amount);
        res.json({ message: "Charged!"});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default donateRouter;