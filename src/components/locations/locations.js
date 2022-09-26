import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./locations.css"

export const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompleted] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8088/locations`)
      .then((r) => r.json())
      .then((l) => {
        setLocations(l)
        fetch(`http://localhost:8088/challenges`)
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

if(!isLoading){
    return "Loading"
}

locations.sort((a,b) => {
    return b.location_machine_xrefs.length - a.location_machine_xrefs.length
})

const navClick = (id) =>{
    navigate(`location/${id}`)
}

return (
    <>
    <h2>Locations</h2>
    <ListGroup>
    {
        locations.map(location => {
            return<> 

                <ListGroupItem
                className="lgi"
                key={location.id}
            action
            active
            onClick={()=> navClick(location.id)}
            tag="a"
            >
      {location.name} ({location.location_machine_xrefs.length} games)
    </ListGroupItem>

</>
        }

        )
    }
        </ListGroup>
    </>
)


}