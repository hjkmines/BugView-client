import React from 'react'; 
import { Link } from 'react-router-dom'; 

const Signup = () => {
    return (
        <div className='mycard'>
        <div className='card auth-card input field'>
            <h2>BugView</h2>
            <input 
                type='text'
                placeholder='First Name'
            />
            <input 
                type='text'
                placeholder='Last Name'
            />
            <input 
                type='text'
                placeholder='Job Title'
            />
            <input 
                type='text'
                placeholder='Email'
            />
            <input 
                type='password'
                placeholder='password'
            />
            <button 
                className='btn waves-effect waves-light #64b5f6 blue lighten-2' 
            >
                Register
            </button>
            <h5>
                <Link to='/login'>Already have an account?</Link>
            </h5>
        </div>
        </div>
    )
}; 

export default Signup; 