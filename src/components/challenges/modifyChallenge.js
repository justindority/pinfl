import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ModifyChallenge = () => {
    const { challengeId } = useParams()
    const [locations,setLocations] = useState([])
    const [challenge,updateChallenge] = useState({})
    const [users, setUsers] = useState([])
    const [selectedLocation, setSelectedLocation] = useState()
    const [opponentId, setOpponent] = useState()
    const navigate = useNavigate()



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
                    })
            })
    },[])

    useEffect(()=>{
        let foundLocation = locations.find(l => l.id === challenge?.locationId)
        setSelectedLocation(foundLocation)

        if(challenge.recipientId === pinflUserObject.id){
            setOpponent(challenge.challengerId)
        } else if(challenge.challengerId === pinflUserObject.id){
            setOpponent(challenge.recipientId)
        }

    },[challenge])




    const handleSubmitButtonClick = (event) => {
        event.preventDefault()
    
            return fetch(`http://localhost:8088/challenges/${challengeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(challenge)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/challenges")
                })
    
    }

    const handleDeleteButtonClick = (evt) => {
        evt.preventDefault()

        return fetch(`http://localhost:8088/challenges/${challengeId}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then((resp) => {
                navigate("/challenges")
            })

    }

    return (
        <form className="challenge-form">
            <h2 className="challenge-form-title">Modify Challenge</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="opponents">Opponent:</label>
                    <select disabled
                    className="form-control"
                        value={opponentId}
                        onChange={
                            (event) => {
                                const copy = {...challenge}
                                copy.opponentId = parseInt(event.target.value)
                                updateChallenge(copy)
                            }
                        }>
                            <option
                            value={0}
                            >Choose Opponent</option>
                            {
                                users.map(u => {if(u.id !== pinflUserObject.id){
                                    return <option key={u.id} value={u.id}>{u.name}</option>
                                }})
                            }

                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="locations">Location:</label>
                    <select
                    className="form-control"
                        value={challenge?.locationId}
                        onChange={
                            (event) => {
                                const copy = {...challenge}
                                copy.locationId = parseInt(event.target.value)
                                updateChallenge(copy)
                                challenge.game1Id = ""
                                challenge.game2Id = ""
                                challenge.game3Id = ""
                            }
                        }>
                            <option
                            value={0}
                            >Choose Location</option>
                            {
                                locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)
                            }

                        </select>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date"
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
                <label htmlFor="locations">Game 1:</label>
                    <select
                    className="form-control"
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

                        </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="game2">Game 2:</label>
                    <select
                    className="form-control"
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
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="game3">Game 3:</label>
                    <select
                    className="form-control"
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
                </div>
            </fieldset>
          
            <button 
            onClick={handleSubmitButtonClick}
            className="btn btn-primary">
                Submit Challenge Modifications
            </button>

            <button
            onClick={handleDeleteButtonClick}
            className="btn btn-primary">
                Delete Challenge
            </button>
        </form>
    )
}