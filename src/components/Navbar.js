import React from 'react'; 

const Navbar = () => {
    return (
        <div>
            <nav>
                <div class="nav-wrapper">
                    <a href="/" class="brand-logo">BugView</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a href="/login">Log In</a></li>
                            <li><a href="/signup">Register</a></li>
                            <li><a href="/profile">My Profile</a></li>
                        </ul>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 