import React, { useState, useContext } from 'react'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import { UserContext } from '../context/UserProvider.js'

export default function Issue(props) {
    const [commentToggle, setCommentToggle] = useState(false)
    const [comments, setComments] = useState([])
    // console.log(comments)

    const { title, description, postedBy, upvotedBy, downvotedBy, _id } = props
    // console.log(postedBy.username, "test username")

    const { 
        user: {
            username
        },
        deleteIssue,
        upvoteIssue,
        downvoteIssue,
        userAxios } = useContext(UserContext)
    // took out comments, getCommentsByIssue

    const totalVotes = upvotedBy.length - downvotedBy.length

    function commentButton(_id) {
        getCommentsByIssue(_id)
        setCommentToggle(prevState => !prevState)
    }

    function getCommentsByIssue(issueId) {
        userAxios.get(`/api/comment/${issueId}`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err.respons.data.errMsg))
    }

    function addComment(issueId, newComment) {
        // console.log(newComment)
        userAxios.post(`/api/comment/${issueId}`, newComment)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        getCommentsByIssue(issueId)
    }

    // .then(res => {
    //     setComments(prevComments => [...prevComments, res.data])
    // })

    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => console.log(res))
            .then(res => setComments(prevComments => prevComments.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err.response.data.errMsg))
    }


    return (
        <div className='issue'>
            <p className='display-5'>{title}</p>
            <p className='lead'>{description}</p>
            {username !== postedBy.username && <p>posted by: {postedBy.username}</p>}
            <p> total votes: {totalVotes}</p>
            <button onClick={() => upvoteIssue(_id)} className="btn btn-info btn-sm m-1">Upvote</button>
            <button onClick={() => downvoteIssue(_id)} className="btn btn-info btn-sm m-1">Downvote</button>
            {username === postedBy.username && <button onClick={() => deleteIssue(_id)} className="btn btn-info btn-sm m-1">Delete</button>}
            {/* <CommentForm 
                addComment={addComment}
                _id={_id}
            /> */}
            <button onClick={() => commentButton(_id)} className="btn btn-info btn-sm m-1">{commentToggle ? "Hide Comments" : "Show Comments"}</button>
            {commentToggle && <CommentForm
                addComment={addComment}
                _id={_id}
            />}
            {commentToggle && <CommentList comments={comments} deleteComment={deleteComment} />}
        </div>
    )
}