import React, { useState } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import M from 'materialize-css'; 

const Signup = () => {
    const history = useHistory(); 
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLasttName] = useState(''); 
    const [jobTitle, setJobTitle] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const PostData = () => {
        fetch('/signup', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                firstName, 
                lastName, 
                jobTitle, 
                email, 
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                M.toast({ html: data.error, classes: '#c62828 red darken-3' })
            } else {
                M.toast({ html: data.message, classes: '#43a047 green darken-1' })
                history.push('/login')
            }
        })
    }

    return (
        <div className='mycard'>
        <div className='card auth-card input field'>
            <h2>BugView</h2>
            <input 
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLasttName(e.target.value)}
            />
            <input 
                type='text'
                placeholder='Job Title'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />
            <input 
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                className='btn waves-effect waves-light #64b5f6 blue lighten-2' 
                onClick={() => PostData()}
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