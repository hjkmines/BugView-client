import React, { useEffect, useState, useContext } from 'react'; 
import { UserContext } from '../../App'; 
import { useParams } from 'react-router-dom'; 

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext); 
    const { userid } = useParams(); 
    const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true);

    useEffect(() => {       

        fetch(`/user/${userid}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setUserProfile(result)
        })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                followId: userid
            })
            }).then(res => res.json())
            .then(data => {
                dispatch({ type: 'UPDATE', payload: {following: data.following, followers: data.followers} })
                localStorage.setItem('user', JSON.stringify(data))
                setUserProfile((prevState) => {
                    return {
                        ...prevState, 
                        user: {
                            ...prevState.user, 
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setShowFollow(false)
    })}

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                unfollowId: userid
            })
            }).then(res => res.json())
            .then(data => {
                dispatch({ type: 'UPDATE', payload: {following: data.following, followers: data.followers} })
                localStorage.setItem('user', JSON.stringify(data))
                setUserProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item !== data._id)
                    return {
                        ...prevState, 
                        user: {
                            ...prevState.user, 
                            followers: newFollower
                        }
                    }
                })

                setShowFollow(true)
    })}

    return (
        <>
        {userProfile ? 
        
            <div style={{ maxWidth: '1200px', margin: '0px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: '2px solid grey' }}>
                <div>
                    <img 
                    style={{ width: '240px', height: '240px', borderRadius: '160px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} 
                    src={userProfile.user.image}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h5><strong>Name: </strong> {userProfile.user.firstName} {userProfile.user.lastName}</h5>
                    <h5><strong>Email: </strong>{userProfile.user.email}</h5>
                    <h5><strong>Job Title: </strong>{userProfile.user.jobTitle}</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                        <h5><strong>{userProfile.posts.length}</strong> ticket(s) posted</h5>
                        <h5><strong>{userProfile.user.followers.length}</strong> associated members</h5>
                        {/* <h5>{userProfile.user.following.length} following</h5> */}
                    </div>
                    {
                        showFollow ? 
                    <button 
                        className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                        onClick={() => followUser()}
                        style={{ margin: '20px' }}
                    >
                    Add teammate 
                    </button>
                        :
                    <button 
                        className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                        onClick={() => unfollowUser()}
                        style={{ margin: '20px' }}
                    >
                    Remove teammate 
                    </button>
                    }
                </div>
            </div>
            <div className='gallery'>
            {
                userProfile.posts.map(item => {
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

        : <h2>Loading...</h2>}
        
        </>
    )
}; 

export default Profile; 