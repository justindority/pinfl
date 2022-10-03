import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardSubtitle } from "reactstrap"
import "./notifications.css"

export const NotificationItem = ({notification,challenges,locations,users}) => {
    const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)
    const navigate = useNavigate()

    let challenge = challenges.find(c => c.id === notification.challengeId)

    let opponentId

    if(challenge.challengerId === pinflUserObject.id){
        opponentId = challenge.recipientId
    } else if(challenge.recipientId === pinflUserObject.id){
        opponentId = challenge.challengerId
    }

    const foundOpponent = users.find(u => u.id === opponentId)
    const foundLocations = locations.find(l => l.id === challenge.locationId)

    const closeNotification = (notification) => {
        let modifiedNotification = notification
        modifiedNotification.open = false
        
        fetch(`http://localhost:8088/notifications/${notification.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedNotification)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload(false)
        })
    }


    if(notification.type === 1){
    return (
        <Card className="notificationCard">
         <CardSubtitle>You have been challenged by {foundOpponent.name} to play at {foundLocations.name} on {challenge.challengeDate}!</CardSubtitle>
        {
            notification.open
            ?   <button onClick={()=>closeNotification(notification)}>Close Notification</button>
            : <></>
        }
      
        </Card>
    )
    } else if (notification.type === 2){
        return (
        <Card className="notificationCard">
             <CardSubtitle>{foundOpponent.name} has accepted your challenge to play at {foundLocations.name} on {challenge.challengeDate}</CardSubtitle>
            {
            notification.open
            ?   <button onClick={()=>closeNotification(notification)}>Close Notification</button>
            : <></>
            }
        </Card>
        )
    } else if (notification.type === 5){
        return (
        <Card className="notificationCard">
             <CardSubtitle>{foundOpponent.name} has recorded the results for your challenge at {foundLocations.name} on {challenge.challengeDate}!</CardSubtitle>
            {
            notification.open
            ?   <button onClick={()=>closeNotification(notification)}>Close Notification</button>
            : <></>
            }
        </Card>
        )
    } else if (notification.type === 3){
        return (
        <Card className="notificationCard">
            <CardSubtitle>{foundOpponent.name} modified your upcoming challenge at {foundLocations.name} on {challenge.challengeDate}</CardSubtitle>
            {
            notification.open
            ?   <button onClick={()=>closeNotification(notification)}>Close Notification</button>
            : <></>
            }
        </Card>
        )
    }
    
}