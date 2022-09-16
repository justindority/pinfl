import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileChallenge } from "./profileChallenge"

export const Profile = () => {
    const {userId} = useParams()
    const [user,setUser] = useState({})
    const [challenges,setChallenges] = useState([])
    const [locations, setLocations] = useState([])
    const [games, setGames] = useState([])
    const [completedChallenges, setCompletedChallenges] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`http://localhost:8088/users?id=${userId}`)
        .then(r => r.json())
        .then((array) => {
            const user = array[0]
            setUser(user)
        })
    },[userId])

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

	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)



    if(isLoading){
        return <>Loading</>
    }

    let myChallenges = challenges.filter((c) => {
        if(c.completedChallenges.length > 0)
        return (c.challengerId === parseInt(userId) || c.recipientId === parseInt(userId))
        })

    console.log({myChallenges, challenges})

    if(myChallenges.length === 0){
        return <>
        <h2>{user.name}'s Profile</h2>
        <>No Completed Challenges Found</>
        </>
    }

    if(user.id === pinflUserObject.id){

        let wins = 0
        let losses = 0
        for (const challenge of challenges) {
            if(challenge.completedChallenges.length > 0){
                if(challenge.challengerId === user.id || challenge.recipientId === user.id){
                if(user.id === challenge.completedChallenges.game1WinnerId){
                    if(user.id === challenge.completedChallenges.game2WinnerId){
                        wins++
                    } else if (user.id === challenge.completedChallenges.game3WinnerId){
                        wins++
                    }
                } else if (user.id === challenge.completedChallenges.game2WinnerId){
                    if(user.id === challenge.completedChallenges.game3WinnerId){
                        wins++
                    }
                } else {
                    losses++
                }
                }
            }
        }

        return (
        <>
        <h2>Your Profile</h2>
        <div>
            Wins: {wins} Losses: {losses}
        </div>
        <h4>Completed Challenges</h4>
        {
            challenges.map(c => {
                return <ProfileChallenge key={c.id} challenge={c} locations={locations} games={games} user={user} completedChallenges={completedChallenges} users={users}/>
            })
        }
        </>
        )
    } else {

        let wins = 0
        let losses = 0
        for (const challenge of challenges) {
            if(challenge.completedChallenges.length > 0){
                if(challenge.challengerId === user.id || challenge.recipientId === user.id){
                if(user.id === challenge.completedChallenges.game1WinnerId){
                    if(user.id === challenge.completedChallenges.game2WinnerId){
                        wins++
                    } else if (user.id === challenge.completedChallenges.game3WinnerId){
                        wins++
                    }
                } else if (user.id === challenge.completedChallenges.game2WinnerId){
                    if(user.id === challenge.completedChallenges.game3WinnerId){
                        wins++
                    }
                } else {
                    losses++
                }
                }
            }
        }

        return (
        <>
        <h2>{user.name}'s Profile</h2>
        <div>
            Wins: {wins} Losses: {losses}
        </div>
        <h4>Completed Challenges</h4>
        {
            challenges.map(c => {
                return <ProfileChallenge key={c.id} challenge={c} locations={locations} games={games} user={user} completedChallenges={completedChallenges} users={users}/>
            })
        }
        </>
        )
    }
}