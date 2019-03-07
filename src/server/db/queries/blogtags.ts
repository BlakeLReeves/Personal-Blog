import { Query } from '../index';

// export const getBlogTag = async (blogid: number) => {
//     return new Promise((resolve, reject) => {
//         Connection.query(`CALL spBlogTags(${blogid})`, (err, results, fields) => {
//             if (err) reject(err);
//             resolve(results[0]);
//         });
//     });
// };

const getBlogTag = async (blogid: number) => Query(`CALL spBlogTags(${blogid})`);

// export const insert = async (blogid: number, tagid: number) => {
//     return new Promise((resolve, reject) => {
//         Connection.query(`INSERT into BlogTags (blogid, tagid) VALUE (${blogid}, ${tagid})`, (err, results, fields) => {
//             if (err) reject(err);
//             resolve(results[0]);
//         });
//     });
// };

const insert = async (blogid: number, tagid: number) => Query(`INSERT into BlogTags (blogid, tagid) VALUE (${blogid}, ${tagid})`);

// export const deleteBlogTag = async (blogid: number) => {
//     return new Promise((resolve, reject) => {
//         Connection.query(`DELETE FROM BlogTags WHERE blogid = ?`, [blogid], (err, results, fields) => {
//             if(err) reject(err);
//             resolve(results[0]);
//         });
//     });
// };

const deleteBlogTag = async (blogid: number) => Query(`DELETE FROM BlogTags WHERE blogid = ?`, [blogid]);

export default {
    getBlogTag,
    insert,
    deleteBlogTag
}