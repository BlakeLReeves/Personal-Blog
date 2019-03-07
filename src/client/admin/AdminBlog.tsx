import * as React from 'react';
import { json, Author } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface IAdminBlogProps extends RouteComponentProps<{ id: string }> { }

export interface IAdminBlogState {
    id: number;
    title: string;
    content: string;
    saveStatus: string;
    deleteStatus: string;
}

export default class AdminBlog extends React.Component<IAdminBlogProps, IAdminBlogState> {
    constructor(props: IAdminBlogProps) {
        super(props);
        this.state = {
            id: null,
            title: null,
            content: null,
            saveStatus: null,
            deleteStatus: null
        };


        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    private alert: JSX.Element = null;
    private saving: boolean = false;
    private delete: boolean = false;

    async componentDidMount() {
        if(!Author || Author.authorid === null || Author.role !== 'admin') {
            this.props.history.replace('/login');
        }
        let id = this.props.match.params.id;

        try {
            let blog = await json(`/api/blogs/${id}`);
            this.setState({
                id: blog.id,
                title: blog.title,
                content: blog.content,
            });
        } catch (e) {
            console.log(e);
        }
    }

    async handleDelete() {

        if(this.delete) return;

        let id = this.props.match.params.id;
        try {

            this.delete = true;
            let result = await json(`/api/blogtags/${id}`, 'DELETE');
            if(result) {
                this.setState({
                    title: '',
                    content: '',
                    deleteStatus: 'success'
                })
            } else {
                this.setState({ deleteStatus: 'error' });
            }
            // await fetch(`/api/blogtags/${id}`, {
            //     method: "DELETE"
            // });

            let result2 = await json(`/api/blogs/${id}`, 'DELETE');
            // await fetch(`/api/blogs/${id}`, {
            //     method: "DELETE"
            // });

            //this.props.history.push('/');
        } catch (e) {
            this.setState({ deleteStatus: 'error' });
            console.log(e);
        } finally {
            this.delete = false;
        }
    }

    async handleEdit() {

        if(this.saving) return;

        let id = this.props.match.params.id;
        let data = {
            title: this.state.title,
            content: this.state.content
        }
        console.log(data)
        try {

            this.saving = true;
            let result = await json(`/api/blogs/${id}`, 'PUT', data);
            if(result) {
                this.setState({
                    title: '',
                    content: '',
                    saveStatus: 'success'
                })
            } else {
                this.setState({ saveStatus: 'error' });
            }
            // await fetch(`/api/blogs/${id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify(data)
            // });
            //this.props.history.replace('/');
        } catch (e) {
            this.setState({ saveStatus: 'error' });
            console.log(e);
        } finally {
            this.saving = false;
        }
    }

    render() {

        if(this.state.saveStatus === 'success') {
            this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Blog Edited</div>
        } else if(this.state.saveStatus === 'error') {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Editing Blog</div>
        }

        if(this.state.deleteStatus === 'success') {
            this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Blog Deleted</div>
        } else if(this.state.deleteStatus === 'error') {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Deleting Blog</div>
        }

        const { title, content } = this.state;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <textarea style={{"width": 630}} value={this.state.title} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ title: e.target.value })} className="card-text d-block" id="editTextInput" placeholder={title} ></textarea>
                            <textarea style={{"width": 630}} value={this.state.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })} className="card-text d-block" id="editTextInput" placeholder={content} ></textarea>
                            <div className="card-footer mt-2">{this.props.match.params.id}</div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={this.handleEdit} className="btn btn-info mt-2">Save Changes</button>
                                <button onClick={this.handleDelete} className="btn btn-danger mt-2">Delete</button>
                            </div>
                            {this.alert}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}