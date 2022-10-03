import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardTitle } from "reactstrap"
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

        let newNotification = {
            userId: foundOpponent.id,
            type: 2,
            open: true,
            challengeId: challengeId
        }

        return fetch(`http://localhost:8088/challenges/${challengeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acceptChallenge)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/notifications`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newNotification)
                })
                .then(response => response.json())
                .then(()=> {
                    navigate(`/challenges`)
                })
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
        let result = ""
        completedCheck = completedChallenges.find(cc => cc.challengeId === challenge.id)
        if(past === "true" && completedCheck){

            if(userObject.id === challenge.completedChallenges[0].game1WinnerId){
                if(userObject.id === challenge.completedChallenges[0].game2WinnerId){
                    result = "(W)"
                } else if (userObject.id === challenge.completedChallenges[0].game3WinnerId){
                    result = "(W)"
                } else {
                    result = "(L)"
                }
            } else if (userObject.id === challenge.completedChallenges[0].game2WinnerId){
                if(userObject.id === challenge.completedChallenges[0].game3WinnerId){
                    result = "(W)"
                } else {
                    result = "(L)"
                }
            } else {
                result = "(L)"
            }

            let completedChallenge = completedChallenges.find(cc => cc.challengeId === challenge.id)
            let game1winner = users.find(u => u.id === completedChallenge.game1WinnerId)
            let game2winner = users.find(u => u.id === completedChallenge.game2WinnerId)
            let game3winner = users.find(u => u.id === completedChallenge.game3WinnerId)

            return (<Card id={challenge.id} key={challenge.id} className="">
            <div className="headerTop">
              <CardTitle tag={"h3"}>vs. {foundOpponent?.name} {result}</CardTitle>
  
              <p>At {foundLocation?.name} on {challenge.challengeDate}</p>
              <p>Game 1: {foundGame1?.name} (Winner: {game1winner.name})</p>
              </div>
              <img src={foundGame1?.images[0]?.urls?.small}/>
              <div className="content">
              <p>Game 2: {foundGame2?.name} (Winner: {game2winner.name})</p>
              </div>
              <img src={foundGame2?.images[0]?.urls?.small}/>
              <div className="content">
              <p>Game 3: {foundGame3?.name} (Winner: {game3winner.name})</p>
              </div>
              <img src={foundGame3?.images[0]?.urls?.small}/></Card>)
            
        } else if (past === "false" && !completedCheck) {
        return (<Card id={challenge.id} key={challenge.id} className="">
          <div className="headerTop">
            <CardTitle tag={"h3"}>vs. {foundOpponent?.name}</CardTitle>

            <p>At {foundLocation?.name} on {challenge.challengeDate}</p>
            <p>Game 1: {foundGame1?.name}</p>
            </div>
            <img src={foundGame1?.images[0]?.urls?.small}/>
            <div className="content">
            <p>Game 2: {foundGame2?.name} </p>
            </div>
            <img src={foundGame2?.images[0]?.urls?.small}/>
            <div className="content">
            <p>Game 3: {foundGame3?.name}</p>
            </div>
            <img src={foundGame3?.images[0]?.urls?.small}/>
            <div className="buttons content">
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
            </div>
           
        </Card>) 
        }
    }
}