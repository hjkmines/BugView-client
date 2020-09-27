import React from 'react'; 

const CreatePost = () => {
    return (
        <div className='card input-filled'>
            <input type='text' placeholder='Title' />
            <input type='text' placeholder='Description' />
            <input type='text' placeholder='Due Date' />
            <input type='text' placeholder='GitHub Link' />
            <input type='text' placeholder='Assign Team Members' />
            <input type='text' placeholder='Severity' />
        </div>
    )
}; 

export default CreatePost; 