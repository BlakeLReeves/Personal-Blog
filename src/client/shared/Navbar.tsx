import * as React from 'react';
import { Link } from 'react-router-dom';

export interface NavbarProps { }

const Navbar: React.SFC<NavbarProps> = () => {
    return (
        <nav className="nav bg-dark">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/new" className="nav-link">Post Blog</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link onClick={() => {localStorage.clear(); this.props.history.replace('/')}} to="/" className="nav-link">Logout</Link>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/donate" className="nav-link">Donate</Link>
            <Link to="/email" className="nav-link">Email</Link>
        </nav>
    );
}

export default Navbar;