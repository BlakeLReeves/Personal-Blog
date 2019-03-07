import { Query } from '../index';

const getAllAuthors = async () => Query(`SELECT * FROM Authors`);

const getOneAuthor = async (id: number) => Query(`SELECT * FROM Authors WHERE id = ?`, [id]);

const findOneByEmail = async (email: string) => Query(`SELECT * FROM Authors WHERE email = '${email}' LIMIT 1`);

const findOneById = async (id: number) => Query(`SELECT * FROM Authors WHERE id = ? LIMIT 1`, [id]);

const insert = async (author: any) => Query(`INSERT INTO Authors (name, email, password) VALUES ?`, [author]);

export default {
    getOneAuthor,
    getAllAuthors,
    findOneByEmail,
    findOneById,
    insert
}