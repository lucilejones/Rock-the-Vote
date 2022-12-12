import React, { useState, useContext } from 'react'
import CommentList from './CommentList.js'
import { UserContext } from '../context/UserProvider.js'

export default function Issue(props) {
    const [commentToggle, setCommentToggle] = useState(false)
    const [comments, setComments] = useState([])

    const { title, description, user, upvotedBy, downvotedBy, _id } = props
    console.log(user.username)

    const { upvoteIssue, downvoteIssue, userAxios } = useContext(UserContext)
    // took out comments, getCommentsByIssue

    const totalVotes = upvotedBy.length - downvotedBy.length

    function commentButton(_id){
        getCommentsByIssue(_id)
        setCommentToggle(prevState => !prevState)
    }

    function getCommentsByIssue(issueId){
        userAxios.get(`/api/comment/${issueId}`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err.respons.data.errMsg))
    }

    
    return (
        <div>
            <h1>{title}</h1>
            <h3>{description}</h3>
            {user.username && <p>posted by: {user.username}</p>}
            <p> total votes: {totalVotes}</p>
            <button onClick={() => upvoteIssue(_id)}>Upvote</button>
            <button onClick={() => downvoteIssue(_id)}>Downvote</button>
            <br />
            <button onClick={() => commentButton(_id)}>{commentToggle ? "Hide Comments" : "Show Comments"}</button>
            {commentToggle && <CommentList comments={comments}/>}
        </div>
    )
}