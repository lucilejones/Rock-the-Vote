import React from 'react'

export default function Comment(props){
    const {text, commentedBy, deleteComment, _id } = props
    // console.log(commentedBy.username)
    

    return (
        <div className='container border-bottom py-3'>
            <span>{commentedBy.username}:</span>
            <p>{text}</p>
            <button onClick={() => deleteComment(_id)} className="btn btn-secondary btn-sm">Delete</button>
        </div>
    )
}