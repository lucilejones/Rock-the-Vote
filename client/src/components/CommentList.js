import React from 'react'
import Comment from './Comment'

export default function CommentList(props){
    const {comments, deleteComment} = props

    return (
        <div>
            {comments.map(comment => <Comment {...comment} key={comment._id} deleteComment={deleteComment}/>)}
        </div>
    )
}