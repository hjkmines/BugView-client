import React, { useEffect, useState, useContext } from 'react'; 
import { UserContext } from '../../App'; 

const Profile = () => {

    const [myPosts, setMyPosts] = useState([]); 
    const { state, dispatch } = useContext(UserContext); 

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

    return (
        <div style={{ maxWidth: '550px', margin: '0px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: '1px solid grey' }}>
                <div>
                    <img 
                    style={{ width: '160px', height: '160px', borderRadius: '80px' }} 
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    />
                </div>
                <div>
                    <h4>{state ? (state.firstName + state.lastName + state.email + state.jobTitle) : 'Loading'}</h4>
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