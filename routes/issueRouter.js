const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// get all issues
issueRouter.get("/", (req, res, next) => {
    Issue.find()
        .populate("user")
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
    Issue.find({ user: req.auth._id }, (err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})


// add new issue
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
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
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.auth._id },
        (err, deletedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Issue ${deletedIssue.title}`)
        }
    )
})

// update issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
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
        { $addToSet: { upvotedBy: req.auth._id } },
        // can put $pull: { downvotedBy: req.auth._id}
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
        { $addToSet: { downvotedBy: req.auth._id } },
        // can put $pull: { upvotedBy: req.auth._id }
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