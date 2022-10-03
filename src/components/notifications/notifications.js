import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NotificationItem } from "./notificationItem"
import { default as notificationsImg } from "./notifications.jpg"

export const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate()
	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)
    const [challenges, setChallenges] = useState([])
    const [locations, setLocations] = useState([])
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/notifications?userId=${pinflUserObject.id}`)
        .then(r => r.json())
        .then((array) => {
            setNotifications(array)
                fetch(`http://localhost:8088/challenges`)
                .then(r => r.json())
                .then((array) => {
                    setChallenges(array)
                    fetch(`http://localhost:8088/users`)
                    .then(r => r.json())
                    .then((array) => {
                        setUsers(array)
                        fetch(`http://localhost:8088/locations`)
                        .then(r => r.json())
                        .then((array) => {
                            setLocations(array)
                            setLoading(false)
                        })
                    })
            })
        })
    },[])

    if(isLoading){
        return "Loading"
    }

    let openNotifications = notifications.filter(n => {
        return n.userId === pinflUserObject.id && n.open === true
    })

    let closedNotifications = notifications.filter(n => {
        return n.userId === pinflUserObject.id && n.open === false
    })

    const openNotificationFunction = (openNotifications) => {
            return openNotifications.map(notification => {
                return (
                <>
                <NotificationItem key={notification.id} challenges={challenges} notification={notification} users={users} locations={locations}/>
                </>
                )
            })
    }

    const closedNotificationFunction = (closedNotifications) => {
        return closedNotifications.map(notification => {
            return (
            <>
            <NotificationItem key={notification.id} challenges={challenges} notification={notification} users={users} locations={locations} />
            </>
            )
        })
}



    return <>
    <img className="bckImg" src={notificationsImg}></img>
    <h2 className="usersH2">Notifications</h2>
    <div className="notifications">
    {
        openNotifications.length > 0
        ? openNotificationFunction(openNotifications)
        : <h3 className="notificationNotification">No open notifications!</h3>

    }
    </div>
    <h2 className="usersH2">Closed Notifications</h2>
    <div className="notifications">
    {
        closedNotifications.length > 0
        ? closedNotificationFunction(closedNotifications)
        : <h3 className="notificationNotification">No closed notifications!</h3>

    }
    </div>
    </>
}