const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

// get all comments
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// get comments by issue
commentRouter.get("/:issueId", (req, res, next) => {
    Comment.find({issue: req.params.issueId})
    .populate("commentedBy", "username")
    .exec((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// add a new comment
commentRouter.post("/:issueId", (req, res, next) => {
    req.body.commentedBy = req.auth._id
    // changed from user to commentedBy
    req.body.issue = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

// delete a comment
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, commentedBy: req.auth._id},
        // user or commentedBy
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Comment was deleted.`)
        }
    )
})

// update a comment
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId, commentedBy: req.auth._id},
        // user or commentedBy
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

module.exports = commentRouter