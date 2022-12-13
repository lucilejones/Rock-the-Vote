import React from 'react'

export default function Comment(props){
    const {text, commentedBy, deleteComment, _id } = props
    // console.log(commentedBy.username)
    

    return (
        <div>
            <p>{commentedBy.username}:</p>
            <p>{text}</p>
            <button onClick={() => deleteComment(_id)}>Delete</button>
        </div>
    )
}