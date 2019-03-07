import * as React from 'react';
import { json, SetAccessToken, Author } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface ILoginProps extends RouteComponentProps { }

export interface ILoginState {
    email: string;
    password: string;
    loginStatus: boolean;
}

export default class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: null,
            password: null,
            loginStatus: false
        };

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }

    private alert: JSX.Element = null;
    private loggingIn: boolean = false;

    componentDidMount() {
        if(Author && Author.role === 'admin') {
            this.props.history.push('/new');
        }
    }

    async handleLoginSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        this.setState({ loginStatus: false });
        if(this.loggingIn) return;

        try {
            this.loggingIn = true;
            let result = await json('/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });

            if(result) {
                SetAccessToken(result.token, { authorid: result.authorid, role: result.role });
                if(result.role === 'admin') {
                    this.props.history.push('/new');
                } else {
                    this.props.history.push('/');
                }
            } else {
                this.setState({ loginStatus: true });
            }
        } catch (e) {
            this.setState({ loginStatus: true });
            throw e;
        } finally {
            this.loggingIn = false;
        }

    }

    render() {

        if(this.state.loginStatus) {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Invalid Credentials</div>
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleLoginSubmit} className="form-group p-3 my-4 shadow-lg bg-white border border-primary rounded">
                        <label>Email:</label>
                        <input
                            className="form-control p-1 my-2"
                            value={this.state.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })} >
                        </input>
                        <label>Password:</label>
                        <input
                            className="form-control p-1 my-2"
                            value={this.state.password}
                            type='password'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })} >
                        </input>
                        <button className="btn btn-primary btn-lg shadow mt-2">Login</button>
                        {this.alert}
                    </form>
                </div>
            </div>
        );
    }
}