const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')
const Comment = require('../models/comment.js')

// get all issues
issueRouter.get("/", (req, res, next) => {
    Issue.find()
        .populate("postedBy")
        .exec((err, issues) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
})

// get all issues
// issueRouter.get("/", (req, res, next) => {
//     Issue.find((err, issues) => {
//         if (err) {
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(issues)
//     })
// })

// get issues by user id
issueRouter.get("/user", (req, res, next) => {
    console.log(req.auth._id)
    // changed user to postedBy
    Issue.find({ postedBy: req.auth._id }, (err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})


// add new issue
issueRouter.post("/", (req, res, next) => {
    req.body.postedBy = req.auth._id
    // changed user to postedBy
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// delete issue
// issueRouter.delete("/:issueId", (req, res, next) => {
//     Issue.findOneAndDelete(
//         { _id: req.params.issueId, user: req.auth._id },
//         // I think this stays as user, but if gets errors try postedBy
//         (err, deletedIssue) => {
//             if (err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(`Successfully deleted Issue ${deletedIssue.title}`)
//         }
//     )
// })

// try?
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.deleteOne({ _id: req.params.issueId, user: req.auth._id},
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            Comment.deleteMany({issue: req.params.issueId}, 
                (err, deletedIssue) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                })
            return res.status(200).send(`Successfully deleted Issue ${deletedIssue.title}`)
        })
})


// update issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
        // I think this stays as user, but if get errors try postedBy
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// upvote an issue
issueRouter.put("/upvote/:issueId", (req, res, next) => {
    Issue.findByIdAndUpdate(
        { _id: req.params.issueId },
        { $addToSet: { upvotedBy: req.auth._id }, $pull: { downvotedBy: req.auth._id } },
        // if a user changes their mind and wants to upvote something they've downvoted,
        // it won't go to zero, it'll go to one
        { new: true }
    )
        // .populate()
        .exec((err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})

// downvote an issue
issueRouter.put("/downvote/:issueId", (req, res, next) => {
    Issue.findByIdAndUpdate(
        { _id: req.params.issueId },
        { $addToSet: { downvotedBy: req.auth._id }, $pull: { upvotedBy: req.auth._id } },
        { new: true }
    )
        .exec((err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})


module.exports = issueRouter