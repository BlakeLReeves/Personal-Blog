import * as express from 'express';

import loginRouter from './login';
import registerRouter from './register';

const authRouter = express.Router();

authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);

export default authRouter;