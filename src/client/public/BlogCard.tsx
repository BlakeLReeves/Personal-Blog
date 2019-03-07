import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

export interface BlogCardProps {
    blog: { id: number, title: string, content: string, _created: Date }
}

const BlogCard: React.SFC<BlogCardProps> = (props) => {
    return (
        <div className="col-md-6">
            <div className="card m-2 border border-info">
                <div className="card-body">
                    <div className="card-title font-weight-bold border border-dark border-top-0 border-left-0 border-right-0">{props.blog.title}</div>
                    <div className="card-text">{props.blog.content.substring(0, 175)}...</div>
                    <div className="card-footer border border-dark border-bottom-0 border-left-0 border-right-0">{moment(props.blog._created).format('MMMM Do, YYYY')}</div>
                    <Link to={`/view/${props.blog.id}`} className="btn btn-outline-info mt-2">View Blog</Link>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;