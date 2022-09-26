import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Challenges } from "../challenges/challenges"
import "./NavBar.css"
import { default as Logo } from "./output-onlinepngtools.png";
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

	const toggle = () => setIsOpen(!isOpen);
	// const [users,setUsers] = useState()

	// useEffect(()=>{
	// 	fetch(`http://localhost:8088/users`)
    //     .then(r => r.json())
    //     .then((usersArray) => {
    //         setUsers(usersArray)
	// 	})}
	// ,[])

	// let user = users.find(u => u.id === pinflUserObject.id)


	return (<>
		<div className="logo-and-navbar">

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
		</div>


		<div>
      <Navbar>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
	</>
    )
}


