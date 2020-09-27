import React from 'react'; 

const Login = () => {
    return (
        <div className='mycard'>
        <div className='card auth-card input field'>
            <h2>BugView</h2>
            <input 
                type='text'
                placeholder='Email'
            />
            <input 
                type='password'
                placeholder='Password'
            />
            <button 
                className='btn waves-effect waves-light #64b5f6 blue lighten-2' 
            >
                Submit
            </button>
        </div>
        </div>
    )
}; 

export default Login; 