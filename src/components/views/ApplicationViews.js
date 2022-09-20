
import { Outlet, Route, Routes } from "react-router-dom"
import { Challenges } from "../challenges/challenges"
import { CreateChallenge } from "../challenges/createChallenge"
import { ModifyChallenge } from "../challenges/modifyChallenge"
import { RecordResults } from "../challenges/recordResults"
import { Profile } from "../users/profile"
import { Users } from "../users/users"

export const ApplicationViews = () => {

	const localPinflUser = localStorage.getItem("pinfl_user")
    const pinflUserObject = JSON.parse(localPinflUser)

	return (
        <Routes>
            <Route path="/" element={
                <>


                    <Outlet />
                </>
            }>

                <Route path="challenges" element={ <Challenges />} />
				<Route path="createChallenge" element={ <CreateChallenge />} />
				<Route path="users" element={ <Users />} />
				<Route path="users/profile/:userId" element={ <Profile />} />
				<Route path="challenges/modify/:challengeId" element={ <ModifyChallenge />} />
				<Route path="challenges/record/:challengeId" element={ <RecordResults />} />


            </Route>
        </Routes>
    )
}
