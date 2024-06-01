import "../CSS/gameinfo.css";
import React from "react";
import Popup from "reactjs-popup";

const EditInfo = ({
  setCurrUsername,
  setCurrName,
  setCurrEmail,
  setCurrPassword,
  newName,
  newPassword,
  newEmail,
  newUsername,
  newDate_of_birth,
}) => {
  const updateInfo = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`this is the EditInfo newName`, newName);
  console.log(`this is the EditInfo newUsername`, newUsername);
  console.log(`this is the EditInfo newEmail`, newEmail);
  console.log(`this is the EditInfo newPassword`, newPassword);
  console.log(`this is the EditInfo newDate_of_birth`, newDate_of_birth);

  return (
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
          <div className="header"> {`${newUsername}`} </div>
          <div className="content">
            <form>
              {/* Form fields for user info */}
              username:
              <input
                type="text"
                placeholder={`${newUsername}`}
                // onChange={(e) => setUsername(e.target.value)}
              />
              Name:
              <input
                type="text"
                placeholder={`${newName}`}
                // onChange={(e) => setName(e.target.value)}
              />
              Password:
              <input
                type="password"
                placeholder={`${newPassword}`}
                // onChange={(e) => setPassword(e.target.value)}
              />
              Email:
              <input
                type="text"
                placeholder={`${newEmail}`}
                // onChange={(e) => setEmail(e.target.value)}
              />
              D.O.B:
              <p>{`${newDate_of_birth}`}</p>
              <button type="submit" onChange={(e) => closeSubmit()}>
                Submit
              </button>
            </form>
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log("modal closed");
                close();
              }}
            >
              close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default EditInfo;
