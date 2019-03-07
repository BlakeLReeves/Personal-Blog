import * as mysql from 'mysql';
import config from '../config';

import Blogs from './queries/blogs';
import Tags from './queries/tags'
import Authors from './queries/authors';
import BlogTags from './queries/blogtags';
import AccessTokens from './queries/accesstokens';

export const pool = mysql.createPool(config.mysql);

// pool.getConnection(err => {
//     if(err) console.log(err);
// });

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, [values], (err, results) => {
            if(err) reject(err);
            return resolve(results);
        });
    });
};

export default {
    Blogs,
    Tags,
    Authors,
    BlogTags,
    AccessTokens
}