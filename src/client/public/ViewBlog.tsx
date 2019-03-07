import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom'
import { json } from '../utils/api';

export interface IViewBlogProps extends RouteComponentProps<{ id: string}> { id: number }

export interface IViewBlogState {
    blog: {
        title: string;
        content: string;
        name: string;
        email: string;
    };
    tags: { name: string }[];
}

export default class ViewBlog extends React.Component<IViewBlogProps, IViewBlogState> {
    constructor(props: IViewBlogProps) {
        super(props);
        this.state = {
            blog: {
                title: null,
                content: null,
                name: null,
                email: null
            },
            tags: []
        };
    }

    async componentWillMount() {
        let id = this.props.match.params.id;
        try {

            let blog = await json(`/api/blogs/${id}`);

            let tags = await json(`/api/blogtags/${id}`);

            this.setState({ blog, tags });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">{this.state.blog.title}</h1>
                    <h6>
                        {this.state.tags.map(tag => <span className='badge badge-info text-dark p-1 my-1 mx-2 border border-dark'>{tag.name}</span>)}
                    </h6>
                    <h6>Author: {this.state.blog.name}</h6>
                    <h6>Email: {this.state.blog.email}</h6>
                    <p>{this.state.blog.content}</p>
                    <Link to={`/admin/${this.props.match.params.id}`} className="btn btn-outline-info mt-2">Edit Blog</Link>
                </div>
            </div>
        );
    }
}