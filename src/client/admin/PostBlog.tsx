import * as React from 'react';
import { json, Author } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface IPostBlogProps extends RouteComponentProps { blog: { id: number } }

export interface IPostBlogState {
    id: number;
    title: string;
    content: string;
    tags: { name: string }[];
    selectedTagId: string;
    saveStatus: string;
}

export default class PostBlog extends React.Component<IPostBlogProps, IPostBlogState> {
    constructor(props: IPostBlogProps) {
        super(props);
        this.state = {
            id: null,
            title: '',
            content: '',
            tags: [],
            selectedTagId: null,
            saveStatus: null
        };

        this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    private alert: JSX.Element = null;
    private saving: boolean = false;

    async componentDidMount() {
        try {
            if(!Author || Author.authorid === null || Author.role !== 'admin') {
                this.props.history.replace('/login');
            }
            let tags = await json('/api/tags');
            this.setState({ tags });
        } catch (e) {
            console.log(e);
        }
    }

    async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        if(this.saving) return;

        let blog = {
            authorid: Author.authorid,
            title: this.state.title,
            content: this.state.content,
        };

        try {

            this.saving = true;
            let result = await json('/api/blogs', 'POST', blog);
            if(result) {
                this.setState({
                    title: '',
                    content: '',
                    saveStatus: 'success'
                })
            } else {
                this.setState({ saveStatus: 'error' });
            }
            let blogtag: any = {
                blogid: result.insertId,
                tagid: this.state.selectedTagId
            };

            let result2 = await json ('/api/blogtags', 'POST', blogtag);

            //this.props.history.replace('/');

        } catch (e) {
            this.setState({ saveStatus: 'error' });
            throw e;
        } finally {
            this.saving = false;
            //this.props.history.replace('/');
        }
    }

    renderTags() {
        return this.state.tags.map((tag: { id: number, name: string }) => {
            return <option value={tag.id}>{tag.name}</option>
        })
    }

    handleSelectTagChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedTagId: e.target.value })
    }

    render() {

        if(this.state.saveStatus === 'success') {
            this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Blog Added</div>
        } else if(this.state.saveStatus === 'error') {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Adding Blog</div>
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit} className="form-group p-3 my-4 shadow-lg bg-white border border-primary rounded">
                        <label>Title:</label>
                        <textarea
                            className="form-control p-1 my-2"
                            value={this.state.title}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ title: e.target.value })} >
                        </textarea>
                        <label>Tag:</label>
                        <select
                            value={this.state.selectedTagId}
                            onChange={this.handleSelectTagChange}
                            className="form-control p-1 my-2"
                        >
                            <option selected value={'0'}>Select a tag ...</option>
                            {this.renderTags()}
                        </select>
                        <label>Content:</label>
                        <textarea
                            className="form-control p-1 my-2"
                            value={this.state.content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })} >
                        </textarea>
                        <button className="btn btn-primary btn-lg shadow mt-2">Post!</button>
                        {this.alert}
                    </form>
                </div>
            </div>
        );
    }
}