import { useNavigate } from "react-router-dom"
import { ModifyChallenge } from "../challenges/modifyChallenge"

export const ProfileChallenge = ({challenge,locations,games,user,completedChallenges,users}) => {
    let navigate = useNavigate()
    let foundOpponentId = null
    let foundOpponent = {}
    let foundLocation = {}
    let completed = false
    let completedCheck = null

    const clickModify = (challengeId) => {
        navigate(`/challenges/modify/${challengeId}`)
    }

    if(challenge.challengerId === user.id){
        foundOpponentId = challenge.recipientId
    } else if(challenge.recipientId === user.id){
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
        if(completedCheck){
            completed = true
        }
        return (<div id={challenge.id} key={challenge.id} className="">
            <h3>Vs. {foundOpponent?.name}</h3>
            <p>At {foundLocation?.name} on {challenge.challengeDate}</p>
            <p>Game 1: {foundGame1?.name}</p>
            <img src={foundGame1?.images[0]?.urls?.small}/>
            <p>Game 2: {foundGame2?.name} </p>
            <img src={foundGame2?.images[0]?.urls?.small}/>
            <p>Game 3: {foundGame3?.name}</p>
            <img src={foundGame3?.images[0]?.urls?.small}/>
            <button onClick={(event)=>clickModify(challenge.id)} >Modify Challenge</button>
            <button onClick={(event)=>clickModify(challenge.id)} >Record Results</button>

        </div>)
    }
}