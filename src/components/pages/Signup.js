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
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: 'Invalid email', classes: '#c62828 red darken-3' })
            return 
        }

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
        }).catch(err => {
            console.log(err)
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