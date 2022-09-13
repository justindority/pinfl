import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Profile = () => {
    const {userId} = useParams()
    const [user,setUser] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:8088/users?id=${userId}`)
        .then(r => r.json())
        .then((array) => {
            console.log(array)
            const user = array[0]
            setUser(user)
        })
    },[userId])

	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)

    if(user.id === pinflUserObject.id){
        return <h2>Your Profile</h2>
    } else {
        return <h2>{user.name}'s Profile</h2>
    }
}