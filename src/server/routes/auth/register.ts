import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
    try {
        let author = req.body;
        author.password = HashPassword(req.body.password);
        let authorValues = Object["values"](author);
        let result: any = await DB.Authors.insert(authorValues);
        let token = await CreateToken({ authorid: result.insertId });
        res.json({
            token,
            role: 'guest',
            authorid: result.insertId
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default registerRouter;