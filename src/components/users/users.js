import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Users = () => {
    const [users,setUsers] = useState([])
    const [challenges,setChallenges] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/users`)
        .then(response => response.json())
        .then((usersArray)=>{
            setUsers(usersArray)
            fetch(`http://localhost:8088/challenges?_embed=completedChallenges`)
                .then(response => response.json())
                .then((challengesArray)=>{
                    setChallenges(challengesArray)
                })
        })
    },[])

    const getWL = (userId) => {

    }

    return (
        <ul>
            {
                users.map(u => {
                    return <li key={u.id}><Link to={`profile/${u.id}`}>{u.name}</Link></li>
                })
            }
</ul>
    )
}
