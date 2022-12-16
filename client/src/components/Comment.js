import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'

export default function Comment(props){
    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const {text, commentedBy, deleteComment, _id} = props
    // console.log(commentedBy.username)
    

    return (
        <div className='container border-bottom py-3'>
            <span>{commentedBy.username}:</span>
            <p>{text}</p>
            {username === commentedBy.username && <button onClick={() => deleteComment(_id)} className="btn btn-secondary btn-sm">Delete</button>}
        </div>
    )
}