import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default function UserProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
        // do comments need to go in here?
        // comments: []
    }

    const navigate = useNavigate()

    const [userState, setUserState] = useState(initState)
    // const [comments, setComments ] = useState([])

    function signup(credentials){
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getUserIssues()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function getUserIssues(){
        userAxios.get("/api/issue/user")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllIssues(){
        userAxios.get("/api/issue")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function upvoteIssue(issueId){
        userAxios.put(`/api/issue/upvote/${issueId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        navigate("/public")
        getAllIssues()
    }
// is there a way to change this to update the displayed isses with the res.data
// instead of calling getAllIssues again?

    function downvoteIssue(issueId){
        userAxios.put(`/api/issue/downvote/${issueId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        navigate("/public")
        getAllIssues()
    }

    function addIssue(newIssue){
        userAxios.post("/api/issue", newIssue)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // function getCommentsByIssue(issueId){
    //     userAxios.get(`/api/comment/${issueId}`)
    //         .then(res => {
    //             setComments(res.data)
    //         })
    //         .catch(err => console.log(err.respons.data.errMsg))
    // }
// maybe need to change this function and state to just be in the issue.js
// so it doesn't update the comment state for all issues

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                resetAuthErr,
                addIssue,
                getUserIssues,
                getAllIssues,
                upvoteIssue,
                downvoteIssue,
                userAxios
                // getCommentsByIssue,
                // comments
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}