import React, { useState, useEffect, useContext, useCallback } from 'react'; 
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom'; 
import 'materialize-css';
import { Button, Modal } from 'react-materialize';

const Home = () => {
    const [data, setData] = useState([]); 
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch('/allpost', {
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
                            <div style={{ backgroundColor: item.severity === 'High' ? 'red' : item.severity === 'Moderate' ? 'green' : item.severity === 'Low' ? 'yellow' : null, height: '10px' }}></div>
                            <h5 style={{ textAlign: 'center' }}>{item.title}</h5> 
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
                            <div className='card-image'>
                            
                            </div>
                            <div className='card-content' style={{paddingTop: '0'}}>
                                <h6 style={{textAlign: 'center'}}><strong>Posted At: </strong>{(item.createdAt).toString().split('').slice(11,19)} {(item.createdAt).toString().split('').slice(0,10)}</h6>
                                <h6 style={{textAlign: 'center'}}><strong>Last Update: </strong>{(item.updatedAt).toString().split('').slice(11,19)} {(item.updatedAt).toString().split('').slice(0,10)}</h6>
                                <br/>
                                <h6 style={{textAlign: 'center'}}><strong>Status: </strong>{item.status === 'Pending' ? <span>⌛</span> : item.status === 'Completed' ? <span>✔️</span> : null} {item.status}</h6>
                                <br/>
                                <h6><strong>Deadline: </strong>{item.due}</h6>
                                <h6><strong>Source Code: </strong>{item.github}</h6>
                                <h6><strong>Severity: </strong>{item.severity} {item.severity === 'High' ? <span>🔴</span> : item.severity === 'Moderate' ? <span>🟢</span> : item.severity === 'Low' ? <span>🟡</span> : null}</h6>
                                <h6><strong>Team Members: </strong>{item.teamMembers}</h6>
                                <h6><strong>Ticket Summary: </strong>{item.body}</h6>
                                {/* <p>{item.likes.length} likes</p> */}
                                <div id="modal1" class="modal">
                                    <div class="modal-content">
                                        <h4>Modal Header</h4>
                                        <p>A bunch of text</p>
                                    </div>
                                    <div class="modal-footer">
                                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                                    </div>
                                </div>
                                <form onSubmit={(e) => {
                                    // e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder='Add a comment' /> 
                                </form>
                                <Modal
                                    actions={[
                                        <Button flat modal="close" node="button" waves="green">Close</Button>
                                    ]}
                                    bottomSheet={false}
                                    fixedFooter
                                    header="Comments"
                                    id="Modal-0"
                                    open={false}
                                    style={{marginBottom: '10px'}}
                                    options={{
                                        dismissible: true,
                                        endingTop: '10%',
                                        inDuration: 250,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        opacity: 0.5,
                                        outDuration: 250,
                                        preventScrolling: true,
                                        startingTop: '4%'
                                    }}
                                    // root={[object HTMLBodyElement]}
                                    trigger={<div style={{ display: 'flex', justifyContent: 'center' }}><Button node="button">{item.comments.length} Comments</Button></div>}
                                    >
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: '500' }}>{record.postedBy.firstName} {record.postedBy.lastName}:</span> {record.text}</h6>
                                        )
                                    })
                                }
                                </Modal>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}; 

export default Home; 

