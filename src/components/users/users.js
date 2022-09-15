import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Users = () => {
    const [users,setUsers] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/users`)
        .then(response => response.json())
        .then((usersArray)=>{
            setUsers(usersArray)
        })
    },[])


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
