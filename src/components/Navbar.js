import React from 'react'; 
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (
        <div>
            <nav>
                <div class="nav-wrapper">
                    <Link to="/" class="brand-logo">BugView</Link>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><Link to="/login">Log In</Link></li>
                            <li><Link to="/signup">Register</Link></li>
                            <li><Link to="/profile">My Profile</Link></li>
                        </ul>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 