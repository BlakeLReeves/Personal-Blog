import * as React from 'react';
import './scss/app';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RequestBlogs from './public/RequestBlogs';
import PostBlog from './admin/PostBlog';
import Navbar from './shared/Navbar';
import ViewBlog from './public/ViewBlog';
import AdminBlog from './admin/AdminBlog';
import Login from './admin/Login';
import Register from './admin/Register';
import Donate from './public/Donate';
import Email from './public/Email';

export default class IApp extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <Router>
                <>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={RequestBlogs} />
                            <Route exact path='/new' component={PostBlog} />
                            <Route exact path='/view/:id' component={ViewBlog} />
                            <Route exact path='/admin/:id' component={AdminBlog} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/donate' component={Donate} />
                            <Route exact path='/email' component={Email} />
                        </Switch>
                    </div>
                </>
            </Router>
        );
    }
}

interface IAppProps { }

interface IAppState { }