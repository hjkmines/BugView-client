import React from 'react'; 

const Home = () => {
    return (
        <div className='home'>
            <div className='card home-card'>
                <h5>Tony Kim</h5>
                <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' /> 
                </div>
                <div className='card-content'>
                <i className="material-icons" style={ {color: 'red'} }>add</i>
                    <h6>Title</h6>
                    <p>Some sentence</p>
                    <input type='text' placeholder='Add a comment' /> 
                </div>
            </div>
            <div className='card home-card'>
                <h5>Tony Kim</h5>
                <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' /> 
                </div>
                <div className='card-content'>
                <i className="material-icons" style={ {color: 'red'} }>add</i>
                    <h6>Title</h6>
                    <p>Some sentence</p>
                    <input type='text' placeholder='Add a comment' /> 
                </div>
            </div>
            <div className='card home-card'>
                <h5>Tony Kim</h5>
                <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' /> 
                </div>
                <div className='card-content'>
                    <i className="material-icons" style={ {color: 'red'} }>add</i>
                    <h6>Title</h6>
                    <p>Some sentence</p>
                    <input type='text' placeholder='Add a comment' /> 
                </div>
            </div>
        </div>
    )
}; 

export default Home; 