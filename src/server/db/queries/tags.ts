import { Query } from '../index';

const getAllTags = async () => Query(`SELECT * FROM Tags`);

const getOneTag = async (id: number) => Query(`SELECT * FROM Tags WHERE id = ?`, [id]);

export default {
    getOneTag,
    getAllTags
}