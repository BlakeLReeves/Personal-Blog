import * as React from 'react';
import { json, SetAccessToken, Author } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface IRegisterProps extends RouteComponentProps { }

export interface IRegisterState {
    name: string;
    email: string;
    password: string;
    registerStatus: string;
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            registerStatus: null
        };

        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

    }

    private alert: JSX.Element = null;
    private registering: boolean = false;

    componentDidMount() {
        if(Author && Author.role === 'admin') {
            this.props.history.push('/new');
        }
    }

    async handleRegisterSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        if(this.registering) return;

        try {
            this.registering = true;
            let result = await json('/auth/register', 'POST', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            });

            if(result) {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    registerStatus: 'success'
                })
                SetAccessToken(result.token, { authorid: result.authorid, role: result.role });
                if(result.role === 'admin') {
                    this.props.history.push('/new');
                }
            } else {
                this.setState({ registerStatus: 'error' });
            }
        } catch (e) {
            this.setState({ registerStatus: 'error' });
            throw e;
        } finally {
            this.registering = false;
        }

    }

    render() {

        if(this.state.registerStatus === 'success') {
            this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Registered Author: Click the Home link at the top to view all blogs.</div>
        } else if(this.state.registerStatus === 'error') {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Registering Author</div>
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleRegisterSubmit} className="form-group p-3 my-4 shadow-lg bg-white border border-primary rounded">
                    <label>Name:</label>
                        <input
                            className="form-control p-1 my-2"
                            value={this.state.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })} >
                        </input>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })} >
                        </input>
                        <button className="btn btn-primary btn-lg shadow mt-2">Register</button>
                        {this.alert}
                    </form>
                </div>
            </div>
        );
    }
}