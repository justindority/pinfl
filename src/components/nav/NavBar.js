import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Challenges } from "../challenges/challenges"
import "./NavBar.css"


export const NavBar = () => {
	const navigate = useNavigate()
	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)

	return (
		<ul className="navbar">
		<li className="navbar__item active">
			<Link className="navbar__link" to="/challenges">Challenges</Link>
		</li>
		<li className="navbar__item active">
			<Link className="navbar__link" to="/users">Users</Link>
		</li>
		<li className="navbar__item navbar__logout">
			<Link className="navbar__link" to={`/users/profile/${pinflUserObject.id}`}>My Profile</Link>
		</li>
		<li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("pinfl_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
		</ul>
    )
}


