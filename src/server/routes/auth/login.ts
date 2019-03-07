import * as express from 'express';
import * as passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';

const loginRouter = express.Router();

loginRouter.post('/', passport.authenticate('local'), async (req, res, next) => {
    try {
        let token = await CreateToken({ authorid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            authorid: req.user.id
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



export default loginRouter;