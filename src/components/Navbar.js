import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import { UserContext } from '../App'; 

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext); 
    const renderedList = () => {
        if(state) {
            return [
                <li><Link to="/profile">My Profile</Link></li>, 
                <li><Link to="/createpost">Create New Ticket</Link></li>
            ]
        } else {
            return [
                <li><Link to="/login">Log In</Link></li>,
                <li><Link to="/signup">Register</Link></li>
            ]
        }
    }

    return (
        <div>
            <nav>
                <div class="nav-wrapper">
                    <Link to="/" class="brand-logo">BugView</Link>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {renderedList()}
                        </ul>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 