import React, { useState, useEffect } from 'react'; 
import M from 'materialize-css'; 
import { useHistory } from 'react-router-dom'; 

const CreatePost = () => {
    const history = useHistory(); 
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState(''); 
    const [due, setDue] = useState(''); 
    const [github, setGithub] = useState(''); 
    const [teamMembers, setTeamMembers] = useState(''); 
    const [severity, setSeverity] = useState(''); 

    const postDetails = () => {

        fetch('/createpost', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                title, 
                body, 
                due, 
                github, 
                teamMembers, 
                severity 
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log(data)
                M.toast({ html: data.error, classes: '#c62828 red darken-3' })
            } else {
                M.toast({ html: 'Ticket Submitted Successfully', classes: '#43a047 green darken-1' })
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div 
            className='card input-filled'
            style={{
                margin: '30px auto', 
                maxWidth: '500px', 
                padding: '20px', 
                textAlign: 'center'
            }}
        >
            <input 
                type='text' 
                placeholder='Title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                type='text' 
                placeholder='Description' 
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <input 
                type='text' 
                placeholder='Due Date' 
                value={due}
                onChange={(e) => setDue(e.target.value)}
            />
            <input 
                type='text' 
                placeholder='GitHub Link' 
                value={github}
                onChange={(e) => setGithub(e.target.value)}
            />
            <input 
                type='text' 
                placeholder='Assign Team Members' 
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
            />
            <input 
                type='text' 
                placeholder='Severity' 
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
            />
            <button 
                className='btn waves-effect waves-light #64b5f6 blue lighten-2' 
                onClick={() => postDetails()}
            >
                Submit Ticket 
            </button>
        </div>
    )
}; 

export default CreatePost; 