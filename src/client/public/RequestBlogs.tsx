import * as React from 'react';
import '../scss/app';
import { json } from '../utils/api';

import BlogCard from './BlogCard';
import Jumbotron from './Jumbotron';

interface IRequestBlogsProps {

}

interface IRequestBlogsState {
    blogs: Array<{ id: number, title: string, content: string, _created: Date }>;
}

export default class IRequestBlogsApp extends React.Component<IRequestBlogsProps, IRequestBlogsState> {

    constructor(props: IRequestBlogsProps) {
        super(props);

        this.state = { blogs: [] };
    }

    async componentDidMount() {
        try {
            let blogs = await json('/api/blogs');
            this.setState({ blogs });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <div className="row">
                    <Jumbotron />
                </div>
                <div className="row whitesmoke">
                    {this.state.blogs.map(blog => {
                        return <BlogCard key={blog.id} blog={blog} />
                    })}
                </div>
            </>
        )
    }
}