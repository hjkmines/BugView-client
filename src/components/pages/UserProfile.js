import React, { useEffect, useState, useContext } from 'react'; 
import { UserContext } from '../../App'; 
import { useParams } from 'react-router-dom'; 

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext); 
    const { userid } = useParams(); 

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

    return (
        <>
        {userProfile ? 
        
            <div style={{ maxWidth: '550px', margin: '0px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: '1px solid grey' }}>
                <div>
                    <img 
                    style={{ width: '160px', height: '160px', borderRadius: '80px' }} 
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    />
                </div>
                <div>
                    <h4>{userProfile.user.firstName} {userProfile.user.lastName}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <h5>{userProfile.user.jobTitle}</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                        <h5>{userProfile.posts.length} posts</h5>
                        <h5>40 followers</h5>
                        <h5>40 following</h5>
                    </div>
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