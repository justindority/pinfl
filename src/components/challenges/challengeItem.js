import { useNavigate } from "react-router-dom"
import { ModifyChallenge } from "../challenges/modifyChallenge"

export const ChallengeItem = ({challenge,locations,games,userObject,completedChallenges,users,past}) => {
    let navigate = useNavigate()
    let foundOpponentId = null
    let foundOpponent = {}
    let foundLocation = {}
    let completed = false
    let completedCheck = null

    const clickModify = (challengeId) => {
        navigate(`/challenges/modify/${challengeId}`)
    }

    const clickRecord = (challengeId) => {
        navigate(`/challenges/record/${challengeId}`)
    }

    const clickAccept = (challengeId) => {

        const acceptChallenge = challenge
        acceptChallenge.accepted = true

        return fetch(`http://localhost:8088/challenges/${challengeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acceptChallenge)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/challenges`)
            })
    }

    const findUser = (winnerId) => {
        let winnerUserObject = users.find(u => u.id === winnerId)
        return winnerUserObject
    }


    if(challenge.challengerId === userObject.id){
        foundOpponentId = challenge.recipientId
    } else if(challenge.recipientId === userObject.id){
        foundOpponentId = challenge.challengerId
    } else {
        return ""
    }


    if(foundOpponentId){
        foundOpponent = users.find(u => u.id === foundOpponentId)
        foundLocation = locations.find(l => l.id === challenge.locationId)
        let foundGame1 = games.find(g => g.opdb_id === challenge.game1Id)
        let foundGame2 = games.find(g => g.opdb_id === challenge.game2Id)
        let foundGame3 = games.find(g => g.opdb_id === challenge.game3Id)
        completedCheck = completedChallenges.find(cc => cc.challengeId === challenge.id)
        if(past === "true" && completedCheck){

            return (<div id={challenge.id} key={challenge.id} className="completedChallenge">
            <h3>Vs. {foundOpponent?.name}</h3>
            <p>Completed at {foundLocation?.name} on {challenge.challengeDate}</p>
            <p>Game 1: {foundGame1?.name} (Winner: {findUser(completedCheck.game1WinnerId).name})</p>
            <img src={foundGame1?.images[0]?.urls?.small}/>
            <p>Game 2: {foundGame2?.name} (Winner: {findUser(completedCheck.game2WinnerId).name})</p>
            <img src={foundGame2?.images[0]?.urls?.small}/>
            <p>Game 3: {foundGame3?.name} (Winner: {findUser(completedCheck.game3WinnerId).name})</p>
            <img src={foundGame3?.images[0]?.urls?.small}/></div>)
            
        } else if (past === "false" && !completedCheck) {
        return (<div id={challenge.id} key={challenge.id} className="upcomingChallenge">
            <h3>Vs. {foundOpponent?.name}</h3>
            <p>Upcoming at {foundLocation?.name} on {challenge.challengeDate}</p>
            <p>Game 1: {foundGame1?.name}</p>
            <img src={foundGame1?.images[0]?.urls?.small}/>
            <p>Game 2: {foundGame2?.name} </p>
            <img src={foundGame2?.images[0]?.urls?.small}/>
            <p>Game 3: {foundGame3?.name}</p>
            <img src={foundGame3?.images[0]?.urls?.small}/>
            {
                challenge.accepted === true 
                ?
                <button onClick={(event)=>clickRecord(challenge.id)} >Record Results</button> 
                : ""
            }
            {
                challenge.accepted === false && challenge.recipientId === userObject.id 
                ?
                <button onClick={(event)=>clickAccept(challenge.id)} >Accept Challenge</button>
                : ""
            }
            <button onClick={(event)=>clickModify(challenge.id)} >Modify Challenge</button>

        </div>) 
        }
    }
}