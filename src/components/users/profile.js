import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileChallenge } from "./profileChallenge"
import "./profile.css"




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

    challenges.sort((a,b) => {
        return b.id - a.id
    })

    if(user.id === pinflUserObject.id){

        let wins = 0
        let losses = 0
        for (const challenge of challenges) {
            if(challenge.completedChallenges.length > 0){
                if(challenge.challengerId === user.id || challenge.recipientId === user.id){
                if(user.id === challenge.completedChallenges[0].game1WinnerId){
                    if(user.id === challenge.completedChallenges[0].game2WinnerId){
                        wins++
                    } else if (user.id === challenge.completedChallenges[0].game3WinnerId){
                        wins++
                    } else {
                        losses++
                    }
                } else if (user.id === challenge.completedChallenges[0].game2WinnerId){
                    if(user.id === challenge.completedChallenges[0].game3WinnerId){
                        wins++
                    } else {
                        losses++
                    }
                } else {
                    losses++
                }
                }
            }
        }

        return (
        <>
        <h2 className="usersH2">Your Profile</h2>
        <div>
            <h5 className="usersH5">Wins: {wins} <br></br>Losses: {losses}</h5>
        </div><br/>
        <h3 className="usersH2">Completed Challenges</h3>
        <div className="profileChallenges">
        {
            challenges.map(c => {
                return <ProfileChallenge key={c.id} challenge={c} locations={locations} games={games} user={user} completedChallenges={completedChallenges} users={users}/>
            })
        }
        </div>
        </>
        )
    } else {

        let wins = 0
        let losses = 0
        for (const challenge of challenges) {
            if(challenge.completedChallenges.length > 0){
                if(challenge.challengerId === user.id || challenge.recipientId === user.id){
                if(user.id === challenge.completedChallenges[0].game1WinnerId){
                    if(user.id === challenge.completedChallenges[0].game2WinnerId){
                        wins++
                    } else if (user.id === challenge.completedChallenges[0].game3WinnerId){
                        wins++
                    } else {
                        losses++
                    }
                } else if (user.id === challenge.completedChallenges[0].game2WinnerId){
                    if(user.id === challenge.completedChallenges[0].game3WinnerId){
                        wins++
                    } else {
                        losses++
                    }
                } else {
                    losses++
                }
                }
            }
        }

        return (
        <>
        <h2 className="profileH2">{user.name}'s Profile</h2>
        <div className="usersH5">
            Wins: {wins}
            <br></br>Losses: {losses}
        </div>
        <h4 className="profileH2">Completed Challenges</h4>
        <div className="profileChallenges">
        {
            challenges.map(c => {
                return <ProfileChallenge key={c.id} challenge={c} locations={locations} games={games} user={user} completedChallenges={completedChallenges} users={users}/>
            })
        }
        </div>
        </>
        )
    }
}