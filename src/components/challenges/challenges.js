import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ProfileChallenge } from "../users/profileChallenge"
import { ChallengeItem } from "./challengeItem"
import "./challenges.css"

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

let myCompletedChallenges = myChallenges.filter((c) => {
    for (const challenge of completedChallenges) {
        return (c.id === challenge.challengeId)
    }

})

console.log({myChallenges, challenges})

if(myChallenges.length === 0){
    return <>
    <>No Challenges Found</>
    </>
}

    return (
    <div>
    <h2>{userObject.name}'s Upcoming Challenges</h2>
    <div className="upcomingChallenges">
    {
        challenges.map(c => {
            return <ChallengeItem key={c.id} challenge={c} locations={locations} games={games} userObject={userObject} completedChallenges={completedChallenges} users={users} past={"false"}/>
        })
    }
    </div>        <h2>Past Challenges</h2><br></br>
    <div className="pastChallenges">

    {

                    challenges.map(c => {
            return <ChallengeItem key={c.id} challenge={c} locations={locations} games={games} userObject={userObject} completedChallenges={completedChallenges} users={users} past={"true"}/>
        })
 
    }
    </div>
    </div>
    )
}

