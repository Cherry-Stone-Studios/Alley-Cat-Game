import "../CSS/userinfo.css";
import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import "ldrs/newtonsCradle";

const API_URL = "https://cherry-stone-studios.onrender.com";

const EditInfo = ({
  userToken,
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
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async () => {
    setIsLoading(true);
    setShowPassword(false);
    const confirmation = confirm(
      "Are you sure you want to update your account information?\n\nContact us at cherry.stone.studios.games@gmail.com if you have any issues!"
    );
    if (confirmation === true) {
      if (!currName) {
        currName = thisUser.name;
      }
      if (!currUsername) {
        currUsername = thisUser.username;
      }
      if (!currEmail) {
        currEmail = thisUser.email;
      }

      try {
        const response = await fetch(`${API_URL}/api/users/${thisUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
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
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
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
            <div className="textHeader">Hello{` ${thisUser.username}`}</div>
            <div className="content">
              <form>
                <div className="input">
                  Username:
                  <input
                    type="text"
                    placeholder={` ${thisUser.username}`}
                    onChange={(e) => setCurrUsername(e.target.value)}
                  />
                </div>
                <div className="input">
                  Name:
                  <input
                    type="text"
                    placeholder={` ${thisUser.name}`}
                    onChange={(e) => setCurrName(e.target.value)}
                  />
                </div>
                <div className="input">
                  Password:
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Required: Enter or update your password!"
                    required="required"
                    onChange={(e) => setCurrPassword(e.target.value)}
                  />
                </div>
                <div className="input">
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />
                  Show Password
                </div>
                <div className="input">
                  Email:
                  <input
                    type="text"
                    placeholder={` ${thisUser.email}`}
                    onChange={(e) => setCurrEmail(e.target.value)}
                  />
                </div>
                <div className="input">
                  D.O.B:
                  <input
                    type="text"
                    placeholder={` ${thisUser.date_of_birth}`}
                  />
                </div>
              </form>
            </div>
            <div className="actions">
              <div className="loading">
                {isLoading ? (
                  <l-newtons-cradle color="aqua"></l-newtons-cradle>
                ) : (
                  <button
                    className="button"
                    onClick={async () => {
                      await updateUser();
                      close();
                    }}
                  >
                    Save Info?
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default EditInfo;
