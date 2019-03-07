import { Query } from '../index';

const findOne = async (id: number, token: string) => Query(`SELECT * FROM accesstokens WHERE id = ${id} AND token = ?`, [token]);

const insert = async (authorid: number) => Query(`INSERT INTO accesstokens (authorid) VALUES (${authorid})`);

const update = async (id: number, token: string) => Query(`UPDATE accesstokens SET token = '${token}' WHERE id = ?`, [id]);

export default {
    findOne,
    insert,
    update
}