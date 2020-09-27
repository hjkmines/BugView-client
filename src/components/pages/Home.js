import React, { useState, useEffect } from 'react'; 

const Home = () => {
    const [data, setData] = useState([]); 

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

    return (
        <div className='home'>
            {
                data.map( item => {
                    return (
                        <div className='card home-card' key={item._id}>
                            <h5>{item.postedBy.firstName} {item.postedBy.lastName}</h5>
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
    )
}; 

export default Home; 