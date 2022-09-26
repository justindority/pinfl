import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { ListGroup, ListGroupItem } from "reactstrap"
import "./profile.css"

export const Users = () => {
    const [users,setUsers] = useState([])
    const [challenges,setChallenges] = useState([])
    const navigate = useNavigate()

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

    const navClick = (id) =>{
        navigate(`profile/${id}`)
    }

    return (
        <>
        <h2>Users</h2>
        <ListGroup>
            {
                users.map(u => {
                    return <>
                    <ListGroupItem
                className="lgi"
                key={u.id}
            action
            active
            onClick={()=> navClick(u.id)}
            tag="a"
            >
      {u.name}
    </ListGroupItem>
    </>

                })
            }
            </ListGroup>
</>
    )
}
