import React, { useState } from 'react'; 
import M from 'materialize-css'; 
import { useHistory } from 'react-router-dom'; 

const CreatePost = () => {
    const history = useHistory(); 
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [due, setDue] = useState(''); 
    const [github, setGithub] = useState(''); 
    const [teamMembers, setTeamMembers] = useState(''); 
    const [severity, setSeverity] = useState(''); 
    // const [url, setUrl] = useState(''); 

    const postDetails = () => {
        // const data = new FormData()
        // data.append('file', image)
        // data.append('upload_preset', 'bugview')
        // data.append('cloud_name', 'tk23')
        // fetch('https://api.cloudinary.com/v1_1/tk23/image/upload', {
        //     method: 'POST', 
        //     body: data
        // })
        // .then(res => res.json())
        // .then(data => {
        //     setUrl(data.url)
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        fetch('/createpost', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                title, 
                description, 
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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