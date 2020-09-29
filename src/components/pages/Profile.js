import React, { useEffect, useState, useContext } from 'react'; 
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom' ;

const Profile = () => {
    const [data, setData] = useState([]); 
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

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                postId, 
                text
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id) {
                    return result 
                } else {
                    return item 
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: 'DELETE', 
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            const newData = data.filter(item => {
                return item._id !== result._id 
            })
            setData(newData)
            window.location.reload(); 
        })
    }
    
    return (
        <div style={{ maxWidth: '1200px', margin: '0px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: '2px solid grey' }}>
                <div>
                    <img 
                    style={{ width: '240px', height: '240px', borderRadius: '160px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} 
                    src={state ? state.image 
                    : 
                    <div>
                        <div style={{ textAlign: 'center' }}>Loading...</div>
                        <div class="progress" style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                        <div class="indeterminate"></div>
                        </div>
                    </div>
                    }
                    />
                    <div className='file-field input-field' style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='btn #64b5f6 blue darken-1' style={{ marginBottom: '15px' }}>
                            <span>Update Profile Picture</span>
                            <input type='file' onChange={(e) => updateImage(e.target.files[0])} />
                        </div>
                    <div hidden className='file-path-wrapper'>
                    <input className='file-path validate' type='text' />
                    </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h5><strong>Name: </strong> {state ? (state.firstName + " " + state.lastName) 
                    : 
                    <div>
                        <div style={{ textAlign: 'center' }}>Loading...</div>
                        <div class="progress" style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                        <div class="indeterminate"></div>
                        </div>
                    </div>
                    }</h5>
                    <h5><strong>Email: </strong> {state ? (state.email) 
                    : 
                    <div>
                        <div style={{ textAlign: 'center' }}>Loading...</div>
                        <div class="progress" style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                        <div class="indeterminate"></div>
                        </div>
                    </div>
                    }</h5>
                    <h5><strong>Job Title: </strong>{state ? (state.jobTitle) 
                    : 
                    <div>
                        <div style={{ textAlign: 'center' }}>Loading...</div>
                        <div class="progress" style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                        <div class="indeterminate"></div>
                        </div>
                    </div>
                    }</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                        <h5><strong>{myPosts.length}</strong> ticket(s) posted</h5>
                        <h5><strong>{state ? state.followers.length : '0'}</strong> associated members</h5>
                        {/* <h5>{state ? state.following.length : '0'} following</h5> */}
                    </div>
                </div>
            </div>
            <div className='gallery'>
            {
                myPosts.map(item => {
                    return(
                        <div className='card home-card' key={item._id}>
                            <div style={{ backgroundColor: item.severity === 'High' ? 'red' : item.severity === 'Moderate' ? 'green' : item.severity === 'Low' ? 'yellow' : null, height: '10px' }}></div>
                            <h5 style={{ textAlign: 'center' }}>{item.title}</h5> 
                            {/* <h5>{item.postedBy.name}</h5> */}
                            {/* <h5 style={{marginLeft: '10px'}}>{state.firstName} {state.lastName}</h5> */}
                            <h5 style={{ marginLeft: '10px', textAlign: 'center' }}><strong>Posted By: </strong> <Link to={item.postedBy._id !== state._id ? ('/profile/' + item.postedBy._id) : '/profile'}>{item.postedBy.firstName} {item.postedBy.lastName}</Link> {item.postedBy._id == state._id 
                            && <i 
                                className="material-icons" 
                                style={{ float: 'right', marginRight: '15px'}}
                                onClick={() => deletePost(item._id)}
                                >
                                delete
                            </i>
                            
                            }
                            </h5>
                            <h6 style={{textAlign: 'center'}}><strong>Posted At: </strong>{(item.createdAt).toString().split('').slice(11,19)} {(item.createdAt).toString().split('').slice(0,10)}</h6>
                                <h6 style={{textAlign: 'center'}}><strong>Last Update: </strong>{(item.updatedAt).toString().split('').slice(11,19)} {(item.updatedAt).toString().split('').slice(0,10)}</h6>
                                <br/>
                                <h6 style={{textAlign: 'center'}}><strong>Status: </strong>{item.status === 'Pending' ? <span>⌛</span> : item.status === 'Completed' ? <span>✔️</span> : null} {item.status}</h6>
                                <br/>
                            <div className='card-image'>
                            </div>
                            <div className='card-content' style={{paddingTop: '0'}}>
                                <h6><strong>Deadline: </strong>{item.due}</h6>
                                <h6><strong>Source Code: </strong>{item.github}</h6>
                                <h6><strong>Severity: </strong>{item.severity} {item.severity === 'High' ? <span>🔴</span> : item.severity === 'Moderate' ? <span>🟢</span> : item.severity === 'Low' ? <span>🟡</span> : null}</h6>
                                <h6><strong>Team Members: </strong>{item.teamMembers}</h6>
                                <h6><strong>Ticket Summary: </strong>{item.body}</h6>
                            </div>
                            {/* <form onSubmit={(e) => {
                                    // e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder='Add a comment' /> 
                                </form>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: '500' }}>{record.postedBy.firstName} {record.postedBy.lastName}:</span> {record.text}</h6>
                                        )
                                    })
                                } */}
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}; 

export default Profile; 