import * as express from 'express';
import * as passport from 'passport';

import blogRouter from './blogs';
import tagRouter from './tags';
import authorRouter from './authors';
import blogtagRouter from './blogtags';
import donateRouter from './donate';
import emailRouter from './email';

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

apiRouter.use('/blogs', blogRouter);
apiRouter.use('/tags', tagRouter);
apiRouter.use('/authors', authorRouter);
apiRouter.use('/blogtags', blogtagRouter);
apiRouter.use('/donate', donateRouter);
apiRouter.use('/email', emailRouter);

export default apiRouter;