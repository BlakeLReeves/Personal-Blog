import * as express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { sendEmail } from '../../utils/mailgun/emails';

const emailRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

emailRouter.post('/', async (req, res, next) => {
    try {
        await sendEmail('blake.reeves19@gmail.com', req.body.email, req.body.subject, req.body.message);
        res.json({ message: "Sent!"});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default emailRouter;