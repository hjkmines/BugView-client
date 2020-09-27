import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import { UserContext } from '../App'; 

const Navbar = () => {
    const history = useHistory(); 
    const { state, dispatch } = useContext(UserContext); 
    const renderedList = () => {
        if(state) {
            return [
                <li><Link to="/profile">My Profile</Link></li>, 
                <li><Link to="/createpost">Create New Ticket</Link></li>,
                <li>
                    <button 
                        className='btn #c62828 red darken-3' 
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: 'CLEAR' })
                            history.push('/login')
                        }}
                    >
                        Log Out
                    </button>
                </li>
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
                    <Link to={ state ? "/" : "/login" } class="brand-logo">BugView</Link>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {renderedList()}
                        </ul>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 