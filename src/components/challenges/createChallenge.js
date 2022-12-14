import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { default as createImage } from "./createchallenge2.jpg";
import { default as createImage2 } from "./createImage2.jpg";
import { default as createImage3 } from "./createimage3.jpg";

export const CreateChallenge = () => {
  const [locations, setLocations] = useState([]);
  const [challenge, updateChallenge] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/locations`)
      .then((response) => response.json())
      .then((locationsArray) => {
        setLocations(locationsArray);

        fetch(`http://localhost:8088/users`)
          .then((response) => response.json())
          .then((usersArray) => {
            setUsers(usersArray);
          });
      });
  }, []);

  useEffect(() => {
    let foundLocation = locations.find((l) => l.id === challenge.locationId);
    if(challenge.locationId){
        foundLocation.location_machine_xrefs.sort((a,b) => {
            return b.machine.name - a.machine.name
        })
    }
    setSelectedLocation(foundLocation);
  }, [challenge.locationId]);

  const localPinflUser = localStorage.getItem("pinfl_user");
  const pinflUserObject = JSON.parse(localPinflUser);

  const navigateChallenges = () => {
    navigate(`challenges`);
  };

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    if (
      challenge.opponentId &&
      challenge.locationId &&
      challenge.challengeDate &&
      challenge.game1Id &&
      challenge.game2Id &&
      challenge.game3Id
    ) {
      const newChallenge = {
        challengerId: pinflUserObject.id,
        recipientId: challenge.opponentId,
        locationId: challenge.locationId,
        game1Id: challenge.game1Id,
        game2Id: challenge.game2Id,
        game3Id: challenge.game3Id,
        challengeDate: challenge.challengeDate,
        accepted: false,
      };

      const newNotification = {
        userId: challenge.opponentId,
        type: 1,
        open: true,
      };

      return fetch(`http://localhost:8088/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChallenge),
      })
        .then((response) => response.json())
        .then((resp) => {
          newNotification.challengeId = resp.id;
          fetch(`http://localhost:8088/notifications`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNotification),
          })
            .then((response) => response.json())
            .then(() => {
              navigate(`/challenges`);
            });
        });
    } else {
      window.alert("Please complete all fields");
    }
  };

  return (
    <>
    <img className="bckImg" src={createImage}></img>
      <div className="formDiv">
        <form className="challenge-form">
          <h2 className="challenge-form-title">Create New Challenge</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="opponents">Opponent:</label>
              <select
                className="form-control"
                value={challenge.opponentId}
                onChange={(event) => {
                  const copy = { ...challenge };
                  copy.opponentId = parseInt(event.target.value);
                  updateChallenge(copy);
                }}
              >
                <option value={0}>Choose Opponent</option>
                {users.map((u) => {
                  if (u.id !== pinflUserObject.id) {
                    return (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="locations">Location:</label>
              <select
                className="form-control"
                value={challenge.locationId}
                onChange={(event) => {
                  const copy = { ...challenge };
                  copy.locationId = parseInt(event.target.value);
                  updateChallenge(copy);
                }}
              >
                <option value={0}>Choose Location</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={challenge?.challengeDate}
                onChange={(event) => {
                  const copy = { ...challenge };
                  copy.challengeDate = event.target.value;
                  updateChallenge(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="locations">Game 1:</label>
              <select
                className="form-control"
                value={challenge.game1}
                onChange={(event) => {
                  const copy = { ...challenge };
                  copy.game1Id = event.target.value;
                  updateChallenge(copy);
                }}
              >
                <option value={0}>Choose Game 1</option>
                {selectedLocation?.location_machine_xrefs.map((g) => (
                  <option key={g.machine.opdb_id} value={g.machine.opdb_id}>
                    {g.machine.name} ({g.machine.manufacturer} {g.machine.year})
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="game2">Game 2:</label>
              <select
                className="form-control"
                value={challenge.game2}
                onChange={(event) => {
                  const copy = { ...challenge };
                  copy.game2Id = event.target.value;
                  updateChallenge(copy);
                }}
              >
                <option value={0}>Choose Game 2</option>
                {selectedLocation?.location_machine_xrefs.map((g) => (
                  <option key={g.machine.opdb_id} value={g.machine.opdb_id}>
                    {g.machine.name} ({g.machine.manufacturer} {g.machine.year})
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="game3">Game 3:</label>
              <select
                className="form-control"
                value={challenge.game3}
                onChange={(event) => {
                  const copy = { ...challenge };
                  copy.game3Id = event.target.value;
                  updateChallenge(copy);
                }}
              >
                <option value={0}>Choose Game 3</option>
                {selectedLocation?.location_machine_xrefs.map((g) => (
                  <option key={g.machine.opdb_id} value={g.machine.opdb_id}>
                    {g.machine.name} ({g.machine.manufacturer} {g.machine.year})
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <button
            onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
            className="btn btn-primary"
          >
            Submit Challenge
          </button>
        </form>
      </div>
    </>
  );
};
