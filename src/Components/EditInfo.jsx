import "../CSS/gameinfo.css";
import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";

const API_URL = "https://cherry-stone-studios.onrender.com";

const EditInfo = ({
  currName,
  setCurrName,
  currUsername,
  setCurrUsername,
  currEmail,
  setCurrEmail,
  currPassword,
  setCurrPassword,
  thisUser,
  setThisUser,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const updateUser = async () => {
    const confirmation = confirm(
      "Are you sure you want to update your account information?\n\nContact us at cherry.stone.studios.games@gmail.com if you have any issues!"
    );
    if (confirmation === true) {
      try {
        const response = await fetch(`${API_URL}/api/users/${thisUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: currName,
            username: currUsername,
            email: currEmail,
            password: currPassword,
          }),
        });
        const result = await response.json();

        setThisUser(result);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Popup
        trigger={<button className="button"> Edit Account </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> {`${thisUser.username}`} </div>
            <div className="content">
              <form>
                username:
                <input
                  type="text"
                  placeholder={`${thisUser.username}`}
                  onChange={(e) => setCurrUsername(e.target.value)}
                />
                Name:
                <input
                  type="text"
                  placeholder={`${thisUser.name}`}
                  onChange={(e) => setCurrName(e.target.value)}
                />
                Password:
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Change your password!"
                  onChange={(e) => setCurrPassword(e.target.value)}
                />
                See Password?
                <input
                  className="checkbox"
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                Email:
                <input
                  type="text"
                  placeholder={`${thisUser.email}`}
                  onChange={(e) => setCurrEmail(e.target.value)}
                />
                D.O.B:
                <p>{`${thisUser.date_of_birth}`}</p>
                <button type="submit" onChange={(e) => closeSubmit()}>
                  Submit
                </button>
              </form>
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={async () => {
                  await updateUser();
                  close();
                }}
              >
                Save Info?
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default EditInfo;
