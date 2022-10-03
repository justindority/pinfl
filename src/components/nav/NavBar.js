import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Challenges } from "../challenges/challenges"
import "./NavBar.css"
import { default as Logo } from "./output-onlinepngtools.png";
import { default as homeLogo } from "./homelogo.png";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
  } from 'reactstrap';


export const NavBar = () => {
	const navigate = useNavigate()
	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useState([])
	const [isLoading, setLoading] = useState(true)

	useEffect(()=>{
        fetch(`http://localhost:8088/notifications?userId=${pinflUserObject.id}`)
        .then(r => r.json())
        .then((array) => {
            setNotifications(array)
			setLoading(false)
        })
    },[])

	if(isLoading){
		return "Loading"
	}
	// const [users,setUsers] = useState()

	// useEffect(()=>{
	// 	fetch(`http://localhost:8088/users`)
    //     .then(r => r.json())
    //     .then((usersArray) => {
    //         setUsers(usersArray)
	// 	})}
	// ,[])

	// let user = users.find(u => u.id === pinflUserObject.id)

	console.log(window.location.pathname)

	let filteredNotifications = notifications.filter(n => {
		return n.userId === pinflUserObject.id && n.open === true
	})
	console.log(filteredNotifications)
	let badge
	if(filteredNotifications.length > 0){
		badge = <span class="badge">{filteredNotifications.length}</span>
	} else {
		badge = ""
	}

	if(window.location.pathname === '/home'){
		return (<>
			{/* <div className="logo-and-navbar">
	
			<ul className="navbar">
				<Link to="/home">
					<img className="navImg" src={Logo}/>
				</Link>
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
	
					<Link className="navbar__link" to="" onClick={() => {
						localStorage.removeItem("pinfl_user")
						navigate("/", {replace: true})
					}}>Logout</Link>
				</li>
			</ul>
			</div> */}
	
	
			<div>
		  <Navbar
		  >
			<NavbarBrand href="/home"></NavbarBrand>
	
					<Nav className="homeul">
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/challenges">Challenges</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/createChallenge">Create Challenge</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/users">Users</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/locations">Locations</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/notifications">Notifications</NavLink>
				  {badge}
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href={`/users/profile/${pinflUserObject.id}`}>My Profile</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="" onClick={() => {
						localStorage.removeItem("pinfl_user")
						navigate("/", {replace: true})
					}}>Logout</NavLink>
				</NavItem>
			
	
	
			  </Nav>
		  </Navbar>
		</div>
		</>
		)
	} else {
		return (<>
			{/* <div className="logo-and-navbar">
	
			<ul className="navbar">
				<Link to="/home">
					<img className="navImg" src={Logo}/>
				</Link>
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
	
					<Link className="navbar__link" to="" onClick={() => {
						localStorage.removeItem("pinfl_user")
						navigate("/", {replace: true})
					}}>Logout</Link>
				</li>
			</ul>
			</div> */}
	
	
			<div className="navRootDiv">
		  <Navbar className="navbarElsewhere">
			<NavbarBrand href="/home"><img className="navImg" src={Logo}/></NavbarBrand>
	
					<Nav className="nonHome">
				<NavItem>
				  <NavLink activeStyle={"text-decoration: underline"} className="hover-underline-animation" href="/challenges">Challenges</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/createChallenge">Create Challenge</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/users">Users</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/locations">Locations</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="/notifications">Notifications</NavLink>
				  {badge}
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href={`/users/profile/${pinflUserObject.id}`}>My Profile</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink className="hover-underline-animation" href="" onClick={() => {
						localStorage.removeItem("pinfl_user")
						navigate("/", {replace: true})
					}}>Logout</NavLink>
				</NavItem>
			
	
	
			  </Nav>
		  </Navbar>
		</div>
		</>
		)
	}

	
}


