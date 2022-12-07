import React from 'react'
import Issue from './Issue'

export default function IssueList(props){
    const { issues } = props

    // create a new array from the prop issues
    // sort by totalVotes descending order and then map
    const sortedList = [].concat(issues)
        .sort((a,b) => b.upvotedBy.length - b.downvotedBy.length > a.upvotedBy.length - a.downvotedBy.length ? 1 : -1)
        .map((issue) =>
            <Issue key={issue._id} {...issue}/>
        )

    return (
        <div>
            { sortedList }
        </div>
    )
}



// export default function IssueList(props){
//     const { issues } = props

//     // create a new array from the prop issues
//     // sort by totalVotes descending order and then map
//     const sortedList = [].concat(issues)
//         .sort((a,b) => b.totalVotes > a.totalVotes ? 1 : -1)
//         .map((issue) =>
//             <Issue key={issue._id} {...issue}/>)

//     return (
//         <div>
//             { sortedList }
//         </div>
//     )
// }


// export default function IssueList(props){
//     const { issues } = props

//     return (
//         <div>
//             { issues.map(issue => <Issue {...issue} key={issue._id}/>)}
//         </div>
//     )
// }