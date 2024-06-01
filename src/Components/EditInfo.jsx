import "../CSS/gameinfo.css";
import React from "react";
import Popup from "reactjs-popup";

const EditInfo = ({ username, name, email, password, date_of_birth }) => {
  const updateInfo = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="header"> {`${username}'s Info:`} </div>
          <div className="content">
            <div>
              <form>
                {/* Form fields for user info */}
                username:
                <input
                  type="text"
                  placeholder={`${username}`}
                  // onChange={(e) => setUsername(e.target.value)}
                />
                Name:
                <input
                  type="text"
                  placeholder={`${name}`}
                  // onChange={(e) => setName(e.target.value)}
                />
                Password:
                <input
                  type="password"
                  placeholder={`${password}`}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                Email:
                <input
                  type="text"
                  placeholder={`${email}`}
                  // onChange={(e) => setEmail(e.target.value)}
                />
                D.O.B:
                <input type="text" placeholder={`${date_of_birth}`} />
                <button type="submit" onChange={(e) => closeSubmit()}>
                  Submit
                </button>
              </form>
            </div>
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
