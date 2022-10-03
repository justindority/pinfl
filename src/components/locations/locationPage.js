import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ListGroup, ListGroupItem } from "reactstrap";
import "./locations.css"

export const LocationPage = () => {
    const { locationId } = useParams()
    const [locations, setLocations] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [completedChallenges, setCompleted] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

  
    useEffect(() => {
      fetch(`http://localhost:8088/locations`)
        .then((r) => r.json())
        .then((l) => {
          setLocations(l)
          fetch(`http://localhost:8088/challenges?_embed=completedChallenges`)
              .then((r) => r.json())
              .then((c) => {
                  setChallenges(c)
                  fetch(`http://localhost:8088/challenges`)
                      .then((r) => r.json())
                      .then((cc) => {
                          setCompleted(cc)
                          fetch(`http://localhost:8088/users`)
                              .then((r) => r.json())
                              .then((u) => {
                                  setUsers(u)
                                  setLoading(true)
                              })
                      })
              })
          })
    }, [])
    
    if(isLoading === false){
        return "Loading"
    }

    const foundLocation = locations.find((l) => {return l.id === parseInt(locationId)})
    const locationCompletions = challenges.filter(c => {
        if(c.completedChallenges.length > 0 && c.locationId === foundLocation.id){
            return c
        }
    })

    let locationPlayers = []

    for (const lc of locationCompletions) {
        if(locationPlayers.includes(lc.challengerId)){

        } else {
            locationPlayers.push(lc.challengerId)
        }
        if(locationPlayers.includes(lc.recipientId)){

        } else {
            locationPlayers.push(lc.recipientId)
        }
    }

    let locationResults = []

    for (const lp of locationPlayers) {
        let wins = 0
        let losses = 0
        let tempObject = {}
        for (const lc of locationCompletions) {
            if(lp === lc.recipientId || lp === lc.challengerId){
                if(lp === lc.completedChallenges[0].game1WinnerId){
                    if(lp === lc.completedChallenges[0].game2WinnerId){
                        wins++
                    } else if (lp === lc.completedChallenges[0].game3WinnerId){
                        wins++
                    } else {
                        losses++
                    }
                } else if (lp === lc.completedChallenges[0].game2WinnerId){
                    if(lp === lc.completedChallenges[0].game3WinnerId){
                        wins++
                    } else {
                        losses++
                    }
                } else {
                    losses++
                }
            }
        }

        let foundUser = users.find(u => u.id === lp)
        tempObject.userId = lp
        tempObject.wins = wins
        tempObject.losses = losses
        tempObject.name = foundUser.name

        locationResults.push(tempObject)
    }

    locationResults.sort((a,b) => {
        return b.wins - a.wins
    })


    const navClick = (id) =>{
        navigate(`/users/profile/${id}`)
    }

    if(locationResults.length > 0){

    return (
        <>

    <h3 className="usersH2">{foundLocation.name}</h3>
    <p className="usersH5">{foundLocation.street}</p>
    <p className="usersH5">{foundLocation.city}, {foundLocation.state}</p>
        <h3 className="usersH3">Top Players at {foundLocation.name}</h3>
        <br></br>

    <ListGroup className="locationsListGroup topPlayers">
        {
            locationResults?.map(lr => {
                return <> 
                <ListGroupItem className="lgi active" onClick={()=>navClick(lr.userId)}>{lr.name} ({lr.wins} Wins, {lr.losses} Losses)</ListGroupItem> 
              
                </>
            })
        }
        </ListGroup>
    <br/>
    <h3 className="usersH3">Games List</h3>
    <br></br>
    {
        foundLocation.location_machine_xrefs.map(game => {
            return <p className="usersH5">{game.machine.name} ({game.machine.manufacturer} {game.machine.year})</p>
        })
    }
        </>
    )
    } else {
        return <> <span>No completed challenges at {foundLocation.name}.&nbsp;</span>
        <Link to={`/createChallenge`}>Create one!</Link>
        <h3>Games List</h3>
    {
        foundLocation.location_machine_xrefs.map(game => {
            return <p>{game.machine.name} ({game.machine.manufacturer} {game.machine.year})</p>
        })
    }
        </>
    }

    




}