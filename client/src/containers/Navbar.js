import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/auth';


class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render(){
        const {currentUser} = this.props;
        const user_id = currentUser.user.id;

        return (
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        CRYPTICIAN
                    </Link>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <input type="checkbox" id="nav-check"/>
                {currentUser.isAuthenticated? (
                    <ul className="list">
                        {(currentUser.user.isAdmin && (
                            <li className="nav-link">
                                <Link to="/create">New Post</Link>
                            </li>
                        ))}
                        <li className="nav-link">
                            <Link to={`/account/${user_id}`}>My Account</Link>
                        </li>
                        <li className="nav-link">
                            <a href="#" onClick={this.logout}>Log out</a>
                        </li>
                    </ul>
                ) : (
                    <ul className="list">
                        <li className="nav-link">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/signin">Sign In</Link>
                        </li>
                    </ul>
                )}
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, {logout})(Navbar);