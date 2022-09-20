import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Challenges } from "../challenges/challenges"
import "./NavBar.css"
import { default as Logo } from "./pinfl.svg";


export const NavBar = () => {
	const navigate = useNavigate()
	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)
	// const [users,setUsers] = useState()

	// useEffect(()=>{
	// 	fetch(`http://localhost:8088/users`)
    //     .then(r => r.json())
    //     .then((usersArray) => {
    //         setUsers(usersArray)
	// 	})}
	// ,[])

	// let user = users.find(u => u.id === pinflUserObject.id)

	

	return (
		<div className="logo-and-navbar">

		<ul className="navbar">
		<img className="navImg" src={Logo} />
		<li className="navbar__item active">
			<Link className="navbar__link" to="/challenges">Challenges</Link>
		</li>
		<li className="navbar__item active">
		<Link className="navbar__link" to="/createChallenge">Create Challenge</Link>
		</li>
		<li className="navbar__item active">
			<Link className="navbar__link" to="/users">Users</Link>
		</li>
		<li className="navbar__item active">
			<Link className="navbar__link" to="/locations">Locations</Link>
		</li>
		<li className="navbar__item navbar__logout">
			<Link className="navbar__link" to={`/users/profile/${pinflUserObject.id}`}>My Profile</Link>
		</li>
		<li className="navbar__item navbar__logout">
			{/* Logged in as {user?.name} */}
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("pinfl_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
		</ul>
		</div>
    )
}


