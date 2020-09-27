import React from 'react'; 

const Profile = () => {
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
                    <h4>Tony Kim</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                        <h5>40 posts</h5>
                        <h5>40 followers</h5>
                        <h5>40 following</h5>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                <img className='item' src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/> 
                <img className='item' src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/> 
                <img className='item' src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/> 
                <img className='item' src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/> 
                <img className='item' src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/> 
                <img className='item' src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/> 
            </div>
        </div>
    )
}; 

export default Profile; 