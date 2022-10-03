import { useNavigate } from "react-router-dom"
import { Card, CardTitle } from "reactstrap"
import { ModifyChallenge } from "../challenges/modifyChallenge"
import "./profile.css"

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

    const clickRecord = (challengeId) => {
        navigate(`/challenges/record/${challengeId}`)
    }

    const findUser = (winnerId) => {
        let winnerUserObject = users.find(u => u.id === winnerId)
        return winnerUserObject
    }

    if(challenge.challengerId === user.id){
        foundOpponentId = challenge.recipientId
    } else if(challenge.recipientId === user.id){
        foundOpponentId = challenge.challengerId
    } else {
        return ""
    }

    const winLossClass = (result) => {
        if(result === "(W)"){
            return 'className="completed-win"'
        } else {
            return 'className="completed-loss"'
        }
    }

    if(foundOpponentId){
        foundOpponent = users.find(u => u.id === foundOpponentId)
        foundLocation = locations.find(l => l.id === challenge.locationId)
        let foundGame1 = games.find(g => g.opdb_id === challenge.game1Id)
        let foundGame2 = games.find(g => g.opdb_id === challenge.game2Id)
        let foundGame3 = games.find(g => g.opdb_id === challenge.game3Id)
        let result = ""
        completedCheck = completedChallenges.find(cc => cc.challengeId === challenge.id)
        if(completedCheck){
            if(user.id === challenge.completedChallenges[0].game1WinnerId){
                if(user.id === challenge.completedChallenges[0].game2WinnerId){
                    result = "(W)"
                } else if (user.id === challenge.completedChallenges[0].game3WinnerId){
                    result = "(W)"
                } else {
                    result = "(L)"
                }
            } else if (user.id === challenge.completedChallenges[0].game2WinnerId){
                if(user.id === challenge.completedChallenges[0].game3WinnerId){
                    result = "(W)"
                } else {
                    result = "(L)"
                }
            } else {
                result = "(L)"
            }


            return (<>
            <Card id={challenge.id} key={challenge.id} className="">
                <div className="headerTop">
            <CardTitle tag={"h3"}>vs. {foundOpponent?.name} {result}</CardTitle>
            <p>Completed at {foundLocation?.name} on {challenge.challengeDate}</p>
            <p>Game 1: {foundGame1?.name} (Winner: {findUser(completedCheck.game1WinnerId).name})</p>
            </div>
            <img src={foundGame1?.images[0]?.urls?.large}/>
            <div className="content">
            <p>Game 2: {foundGame2?.name} (Winner: {findUser(completedCheck.game2WinnerId).name})</p>
            </div>
            <img src={foundGame2?.images[0]?.urls?.large}/>
            <div className="content">
            <p>Game 3: {foundGame3?.name} (Winner: {findUser(completedCheck.game3WinnerId).name})</p>
            </div>
            <img src={foundGame3?.images[0]?.urls?.large}/>

        </Card>
        </>)
        } else {
        return ""
        
        }
    }
}