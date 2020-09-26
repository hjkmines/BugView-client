import React from 'react'; 

const Navbar = () => {
    return (
        <div>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Logo</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a href="sass.html">Log In</a></li>
                            <li><a href="badges.html">Sign Out</a></li>
                            <li><a href="collapsible.html">My Profile</a></li>
                        </ul>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 