import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';

import { ValidToken } from '../utils/security/tokens';
import DB from '../db';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidToken(token);
        let [author] = await DB.Authors.findOneById(payload.authorid);
        if(author) {
            done(null, author);
        } else {
            done(null, false);
        }
    } catch (e) {
        done(e);
    }
}));