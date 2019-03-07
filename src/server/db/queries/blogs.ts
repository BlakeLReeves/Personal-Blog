import { Query } from '../index';

const getAllBlogs = async () => Query(`SELECT * FROM Blogs`);

const getOneBlog = async (id: number) => Query(`SELECT b.*, a.name, a.email FROM Blogs b JOIN Authors a ON a.id = b.authorid WHERE b.id = ?`, [id]);

const deleteBlog = async (id: number) => Query(`DELETE FROM Blogs WHERE id = ?`, [id]);

const postBlog = async (title: string, content: string, authorid: number) => Query(`INSERT INTO Blogs (title, content, authorid) VALUES ("${title}", "${content}", ${authorid})`);

const updateBlog = async (id: number, title: string, content: string) => Query(`UPDATE Blogs SET title = "${title}", content = "${content}" WHERE id = ?`, [id]);

export default {
    getAllBlogs,
    getOneBlog,
    deleteBlog,
    postBlog,
    updateBlog
}