import React from 'react'; 

const CreatePost = () => {
    return (
        <div 
            className='card input-filled'
            style={{
                margin: '30px auto', 
                maxWidth: '500px', 
                padding: '20px', 
                textAlign: 'center'
            }}
        >
            <input type='text' placeholder='Title' />
            <input type='text' placeholder='Description' />
            <input type='text' placeholder='Due Date' />
            <input type='text' placeholder='GitHub Link' />
            <input type='text' placeholder='Assign Team Members' />
            <input type='text' placeholder='Severity' />
            <button 
                className='btn waves-effect waves-light #64b5f6 blue lighten-2' 
            >
                Submit Ticket 
            </button>
        </div>
    )
}; 

export default CreatePost; 