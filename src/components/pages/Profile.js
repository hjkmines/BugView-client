import React, { useEffect, useState, useContext } from 'react'; 
import { UserContext } from '../../App'; 

const Profile = () => {

    const [myPosts, setMyPosts] = useState([]); 
    const { state, dispatch } = useContext(UserContext); 
    const [image, setImage] = useState('') ;
    // const [url, setUrl] = useState(undefined); 

    useEffect(() => {       

        fetch('/mypost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setMyPosts(result.mypost)
        })
    }, [])

    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append('file', image)
            data.append('upload_preset', 'bugview')
            data.append('cloud_name', 'tk23')
            fetch('https://api.cloudinary.com/v1_1/tk23/image/upload', {
                method: 'POST', 
                body: data
            })
            .then(res => res.json())
            .then(data => {

                fetch('/updateimage', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }, 
                    body: JSON.stringify({
                        image: data.url
                    })
                }).then(res => res.json())
                .then(result => {
                    localStorage.setItem('user', JSON.stringify({...state, image: result.image}))
                    dispatch({ type: 'UPDATEIMAGE', payload: result.image })
                    // window.location.reload()
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [image])

    const updateImage = (file) => {
        setImage(file)
    }
    
    return (
        <div style={{ maxWidth: '550px', margin: '0px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: '1px solid grey' }}>
                <div>
                    <img 
                    style={{ width: '160px', height: '160px', borderRadius: '80px' }} 
                    src={state ? state.image : 'loading'}
                    />
                    <div className='file-field input-field'>
                        <div className='btn #64b5f6 blue darken-1'>
                            <span>Update Profile Picture</span>
                            <input type='file' onChange={(e) => updateImage(e.target.files[0])} />
                        </div>
                    <div className='file-path-wrapper'>
                    <input className='file-path validate' type='text' />
                    </div>
                    </div>
                </div>
                <div>
                    <h4>{state ? (state.firstName + state.lastName) : 'Loading'}</h4>
                    <h4>{state ? (state.email) : 'Loading'}</h4>
                    <h4>{state ? (state.jobTitle) : 'Loading'}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                        <h5>{myPosts.length} posts</h5>
                        <h5>{state ? state.followers.length : '0'} followers</h5>
                        <h5>{state ? state.following.length : '0'} following</h5>
                    </div>
                </div>
            </div>
            <div className='gallery'>
            {
                myPosts.map(item => {
                    return(
                        <div className='card home-card' key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <h5>{state.firstName}</h5>
                            <div className='card-image'>
                            <h5>{item.title}</h5> 
                            </div>
                            <div className='card-content'>
                            <i className="material-icons" style={ {color: 'red'} }>add</i>
                                <h6>{item.body}</h6>
                                <p>{item.due}</p>
                                <p>{item.github}</p>
                                <p>{item.teamMembers}</p>
                                <p>{item.severity}</p>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}; 

export default Profile; 