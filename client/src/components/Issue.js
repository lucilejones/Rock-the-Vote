import React, { useState, useContext } from 'react'
import CommentList from './CommentList.js'
import { UserContext } from '../context/UserProvider.js'

export default function Issue(props) {
    const [commentToggle, setCommentToggle] = useState(false)

    const { title, description, user, upvotedBy, downvotedBy, _id } = props
    console.log(user.username)

    const { upvoteIssue, downvoteIssue, getCommentsByIssue, comments } = useContext(UserContext)

    const totalVotes = upvotedBy.length - downvotedBy.length

    function commentButton(_id){
        getCommentsByIssue(_id)
        setCommentToggle(prevState => !prevState)
    }

    
    return (
        <div>
            <h1>{title}</h1>
            <h3>{description}</h3>
            <p>posted by: {user.username}</p>
            <p> total votes: {totalVotes}</p>
            <button onClick={() => upvoteIssue(_id)}>Upvote</button>
            <button onClick={() => downvoteIssue(_id)}>Downvote</button>
            <br />
            <button onClick={() => commentButton(_id)}>{commentToggle ? "Hide Comments" : "Show Comments"}</button>
            {commentToggle && <CommentList comments={comments}/>}
        </div>
    )
}