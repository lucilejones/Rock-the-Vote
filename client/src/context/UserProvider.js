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

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
    }

    const navigate = useNavigate()

    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
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

    function login(credentials) {
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

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function getUserIssues() {
        userAxios.get("/api/issue/user")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllIssues() {
        userAxios.get("/api/issue")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function upvoteIssue(issueId) {
        userAxios.put(`/api/issue/upvote/${issueId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        navigate("/public")
        getAllIssues()
    }
    // is there a way to change this to update the displayed isses with the res.data
    // instead of calling getAllIssues again?

    function downvoteIssue(issueId) {
        userAxios.put(`/api/issue/downvote/${issueId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        navigate("/public")
        getAllIssues()
    }

    function addIssue(newIssue) {
        // console.log(newIssue)
        userAxios.post("/api/issue", newIssue)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteIssue(issueId) {
        userAxios.delete(`/api/issue/${issueId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        getUserIssues()
    }
// need to separate issues state out from the overall user state so can update
// with something like issues.filter(issue => issue._id !== issueId)


    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                resetAuthErr,
                addIssue,
                deleteIssue,
                getUserIssues,
                getAllIssues,
                upvoteIssue,
                downvoteIssue,
                userAxios
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}