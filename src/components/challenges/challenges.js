import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ProfileChallenge } from "../users/profileChallenge"
import { ChallengeItem } from "./challengeItem"

export const Challenges = () => {
    const [challenges,setChallenges] = useState([])
    const [locations, setLocations] = useState([])
    const [games, setGames] = useState([])
    const [completedChallenges, setCompletedChallenges] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)


    useEffect(()=>{
        fetch(`http://localhost:8088/challenges?_embed=completedChallenges`)
        .then(r => r.json())
        .then((challengesArray) => {
            setChallenges(challengesArray)
            fetch(`http://localhost:8088/locations`)
                .then(r => r.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                    fetch(`http://localhost:8088/machines`)
                        .then(r => r.json())
                        .then((gamesArray) => {
                            setGames(gamesArray)
                            fetch(`http://localhost:8088/completedChallenges`)
                                .then(r => r.json())
                                .then((completedArray) => {
                                    setCompletedChallenges(completedArray)
                                    fetch(`http://localhost:8088/users`)
                                        .then(r => r.json())
                                        .then((usersArray) => {
                                            setUsers(usersArray)
                                            setLoading(false)
                                        })
                                })
                        })
                })
        })
    },[])





if(isLoading){
    return <>Loading</>
}

const localPinflUser = localStorage.getItem("pinfl_user")
const pinflUserObject = JSON.parse(localPinflUser)
const userObject = users.find(u => u.id === pinflUserObject.id)

let myChallenges = challenges.filter((c) => {
    return (c.challengerId === parseInt(pinflUserObject.id) || c.recipientId === parseInt(pinflUserObject.id))
    })

console.log({myChallenges, challenges})

if(myChallenges.length === 0){
    return <>
    <>No Challenges Found</>
    </>
}

    return (
    <>
    <Link className="navbar__link" to="/createChallenge">Create Challenge</Link>
    <h2>Upcoming Challenges</h2>
    {
        challenges.map(c => {
            return <ChallengeItem key={c.id} challenge={c} locations={locations} games={games} userObject={userObject} completedChallenges={completedChallenges} users={users} past={"false"}/>
        })
    }
        <h2>Past Challenges</h2>
    {
        challenges.map(c => {
            return <ChallengeItem key={c.id} challenge={c} locations={locations} games={games} userObject={userObject} completedChallenges={completedChallenges} users={users} past={"true"}/>
        })
    }
    </>
    )
}

