import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const RecordResults = () => {

    const navigate = useNavigate()
    const { challengeId } = useParams()
    const [locations,setLocations] = useState([])
    const [challenge,updateChallenge] = useState({})
    const [users, setUsers] = useState([])
    const [selectedLocation, setSelectedLocation] = useState()
    const [opponentId, setOpponentId] = useState()
    const [foundOpponent, setOpponent] = useState({})
    const [game1,setGame1] = useState()
    const [game2,setGame2] = useState()
    const [game3,setGame3] = useState()
    const [isLoading,setLoading] = useState(true)
    const [foundSelf,setSelf] = useState({})
    const [winners,setWinners] = useState({
        game1winner: 0,
        game2winner: 0,
        game3winner: 0
    })





    const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)

    useEffect(()=>{
        fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationsArray)=>{
                setLocations(locationsArray)

                fetch(`http://localhost:8088/users`)
                    .then(response => response.json())
                    .then((usersArray)=>{
                        setUsers(usersArray)
                    })
                        fetch(`http://localhost:8088/challenges/${challengeId}`)
                            .then(response => response.json())
                            .then((array)=>{
                                updateChallenge(array)
                                setLoading(false)
                    })
            })
    },[])
        
    useEffect(()=>{
        if(locations.length !== 0 && challenge){
        let foundLocation = locations.find(l => l.id === challenge.locationId)
        setSelectedLocation(foundLocation)
        let foundGame1 = foundLocation.location_machine_xrefs.find(lmxr => lmxr.machine.opdb_id === challenge.game1Id)
        let foundGame2 = foundLocation.location_machine_xrefs.find(lmxr => lmxr.machine.opdb_id === challenge.game2Id)
        let foundGame3 = foundLocation.location_machine_xrefs.find(lmxr => lmxr.machine.opdb_id === challenge.game3Id)
        setGame1(foundGame1)
        setGame2(foundGame2)
        setGame3(foundGame3)
        
        if(challenge.recipientId === pinflUserObject.id){
            setOpponentId(challenge.challengerId)
        } else if(challenge.challengerId === pinflUserObject.id){
            setOpponentId(challenge.recipientId)
        }


        
        }
    },[challenge])

    useEffect(()=>{
        let foundOpponentObject = users.find(u => u.id === parseInt(opponentId))
        setOpponent(foundOpponentObject)
        let foundSelfObject = users.find(u => u.id === pinflUserObject.id)
        setSelf(foundSelfObject)
    },[opponentId])

    const handleRecordButtonClick = (event) => {
        event.preventDefault()
        const completionObject = {
            challengeId: challenge.id,
            game1WinnerId: winners.game1winner,
            game2WinnerId: winners.game2winner,
            game3WinnerId: winners.game3winner
        }

        return fetch(`http://localhost:8088/completedChallenges`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completionObject)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/challenges`)
            })

        }

    

    const setGame1Winner = (event) => {
        let copy = winners
        copy.game1winner = parseInt(event.target.value)
        setWinners(copy)
    }

    const setGame2Winner = (event) => {
        let copy = winners
        copy.game2winner = parseInt(event.target.value)
        setWinners(copy)
    }

    const setGame3Winner = (event) => {
        let copy = winners
        copy.game3winner = parseInt(event.target.value)
        setWinners(copy)
    }

    if(isLoading){
        return <>Loading</>
    }

    return (
        <form className="challenge-form">
            <h2 className="challenge-form-title">Record Challenge Results</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="opponents">Opponent:</label>
                    <h4>{foundOpponent?.name}</h4>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="locations">Location:</label>
                    <h2>Location: {selectedLocation?.name}</h2>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" disabled
                    value={challenge?.challengeDate}
                    onChange={
                        (event) => {
                            const copy = {...challenge}
                            copy.challengeDate = event.target.value
                            updateChallenge(copy)
                        }
                    } />
            </div>
        </fieldset>                
            <fieldset>
                <div className="form-group">
                <label htmlFor="game1">Game 1:</label>
                    <select
                    className="form-control" disabled
                        value={challenge?.game1Id}
                        onChange={
                            (event) => {
                                const copy = {...challenge}
                                copy.game1Id = event.target.value
                                updateChallenge(copy)
                            }
                        }>
                            <option
                            value={0}
                            >Choose Game 1</option>
                            {
                                selectedLocation?.location_machine_xrefs.map(g => <option key={g.machine.opdb_id} value={g.machine.opdb_id}>{g.machine.name} ({g.machine.manufacturer} {g.machine.year})</option>)
                            }

                        </select><br/>
                        <div onChange={(evt)=>setGame1Winner(evt)}>
                        <label htmlFor="game1Winner">Game 1 Winner:&nbsp;&nbsp;&nbsp;</label>
                        <input id="game1you" name="game1winner" type={"radio"} value={foundSelf?.id}></input>
                        <label htmlFor="game1you"> {foundSelf?.name}&nbsp;&nbsp;&nbsp;</label>
                        <input name="game1winner" type={"radio"} id="game1opponent" value={foundOpponent?.id} ></input>
                        <label htmlFor="game1opponent"> {foundOpponent?.name}</label>
                        </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="game2">Game 2:</label>
                    <select
                    className="form-control" disabled
                        value={challenge?.game2Id}
                        onChange={
                            (event) => {
                                const copy = {...challenge}
                                copy.game2Id = event.target.value
                                updateChallenge(copy)
                            }
                        }>
                            <option
                            value={0}
                            >Choose Game 2</option>
                            {
                                selectedLocation?.location_machine_xrefs.map(g => <option key={g.machine.opdb_id} value={g.machine.opdb_id}>{g.machine.name} ({g.machine.manufacturer} {g.machine.year})</option>)
                            }

                        </select>
                        <div onChange={(evt)=>setGame2Winner(evt)}>
                            <br/>
                        <label htmlFor="game1Winner">Game 2 Winner:&nbsp;&nbsp;</label>
                        <input id="game2you" name="game2winner" type={"radio"} value={foundSelf?.id}></input>
                        <label htmlFor="game2you">{foundSelf?.name}&nbsp;&nbsp;</label>
                        <input name="game2winner" type={"radio"} id="game2opponent" value={foundOpponent?.id} ></input>
                        <label htmlFor="game2opponent">{foundOpponent?.name}</label>
                        </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="game3">Game 3:</label>
                    <select
                    className="form-control" disabled
                        value={challenge?.game3Id}
                        onChange={
                            (event) => {
                                const copy = {...challenge}
                                copy.game3Id = event.target.value
                                updateChallenge(copy)
                            }
                        }>
                            <option
                            value={0}
                            >Choose Game 3</option>
                            {
                                selectedLocation?.location_machine_xrefs.map(g => <option key={g.machine.opdb_id} value={g.machine.opdb_id}>{g.machine.name} ({g.machine.manufacturer} {g.machine.year})</option>)
                            }

                        </select>
                        <div onChange={(evt)=>setGame3Winner(evt)}>
                            <br/>
                        <label htmlFor="game3Winner">Game 3 Winner:&nbsp;&nbsp;</label>
                        <input id="game3you" name="game3winner" type={"radio"} value={foundSelf?.id}></input>
                        <label htmlFor="game3you">{foundSelf?.name}&nbsp;&nbsp;</label>
                        <input name="game3winner" type={"radio"} id="game3opponent" value={foundOpponent?.id} ></input>
                        <label htmlFor="game3opponent">{foundOpponent?.name}</label>
                        </div>
                </div>
            </fieldset>
          
            <button 
            onClick={(clickEvent) => handleRecordButtonClick(clickEvent)}
            className="btn btn-primary">
                Record Challenge Results
            </button>
        </form>
    )
}