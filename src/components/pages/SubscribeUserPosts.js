import React, { useState, useEffect, useContext, useCallback } from 'react'; 
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom'; 

const Home = () => {
    const [data, setData] = useState([]); 
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch('/getsubpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts)
        })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                postId: id 
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
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id 
            })
            setData(newData)
        })
    }

    return (
        <div className='home'>
            {
                data.map( item => {
                    return (
                        <div className='card home-card' key={item._id}>
                            <h5><Link to={item.postedBy._id !== state._id ? ('/profile/' + item.postedBy._id) : '/profile' }>{item.postedBy.firstName} {item.postedBy.lastName}</Link> {item.postedBy._id == state._id 
                            && <i 
                                className="material-icons" 
                                style={{ float: 'right' }}
                                onClick={() => deletePost(item._id)}
                                >
                                delete
                            </i>
                            
                            }</h5>
                            <div className='card-image'>
                            <h5>{item.title}</h5> 
                            
                            </div>
                            <div className='card-content'>
                            <i 
                                className="material-icons" 
                                style={ {color: 'red'} }
                                onClick={() => {likePost(item._id)}}
                            >
                                add
                            </i>
                                <h6>{item.body}</h6>
                                <p>{item.due}</p>
                                <p>{item.github}</p>
                                <p>{item.teamMembers}</p>
                                <p>{item.severity}</p>
                                <p>{item.likes.length} likes</p>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: '500' }}>{record.postedBy.firstName} {record.postedBy.lastName}</span>{record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder='Add a comment' /> 
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}; 

export default Home; 