import userEvent from '@testing-library/user-event';
import React, { useContext, useRef, useEffect, useState } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import { UserContext } from '../App'; 
import M from 'materialize-css'; 

const Navbar = () => {
    const history = useHistory(); 
    const searchModal = useRef(null); 
    const [search, setSearch] = useState('');
    const [userDetails, setUserDetails] = useState([]); 
    const { state, dispatch } = useContext(UserContext); 

    useEffect(() => {
        M.Modal.init(searchModal.current)
    })

    const renderedList = () => {
        if(state) {
            return [
                <li key='1'>
                <i 
                    className='large material-icons modal-trigger'
                    data-target='modal1'
                    style={{ color: 'black' }}
                >
                    search
                </i>
                </li>,
                <li key='2'><Link to="/profile">My Profile</Link></li>, 
                <li key='3'><Link to="/myfollowerspost">My Teams Tickets</Link></li>, 
                <li key='4'><Link to="/createpost">Create New Ticket</Link></li>,
                <li key='5'>
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
                <li key='6'><Link to="/login">Log In</Link></li>,
                <li key='7'><Link to="/signup">Register</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {

        setSearch(query)

        fetch('/search', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                query
            })
        }).then( res => res.json())
        .then(results => {
            setUserDetails(results.user)
        })
    }

    return (
        <div>
            <nav>
                <div class="nav-wrapper">
                    <Link to={ state ? "/" : "/login" } className="brand-logo left">BugView</Link>
                        <ul id="nav-mobile" className="right">
                        {renderedList()}
                        </ul>
                </div>
                <div 
                    id="modal1" 
                    className="modal" 
                    ref={searchModal}
                    style={{ color: 'black' }}
                >
                    <div className="modal-content">
                    <input 
                        type='text'
                        placeholder='Search Users'
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {
                        userDetails.map( item => {
                            return <Link to={item._id !== state._id ? '/profile/' + item._id : '/profile'} onClick={() => {
                                M.Modal.getInstance(searchModal.current).close()
                                setSearch('')
                            }}><li className="collection-item">{item.email}</li></Link>
                        })
                        }
                    </ul>
                    </div>
                <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>Search</button>
                </div>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 