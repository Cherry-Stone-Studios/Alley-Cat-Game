import "../CSS/gameinfo.css";
import React from "react";
import Popup from "reactjs-popup";
import Shiba from "../assets/dogShiba/Shiba.png";
import Crow from "../assets/Bird/Crow.png";
import trashcan from "../assets/Can/trashcan.png";
import Pigeon from "../assets/Bird/Pigeon.png";
import goldieSprite from "../assets/Fish/goldieSprite.png";
import salmonSprite from "../assets/Fish/salmonSprite.png";
import tunaSprite from "../assets/Fish/tunaSprite.png";
import Doberman from "../assets/dogDoberman/Doberman.png";

const GameInfo = () => (
  //Creates a button that renders a pop up menu when clicked
  <Popup
    trigger={<button className="button"> HOW TO PLAY </button>}
    modal
    nested
  >
    {(close) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> HOW TO PLAY </div>
        <div className="content">
          <div className="header"> Controls : </div>
          <p> ⮝ - Jump </p>
          <p> ⮝ + ⮝ - Double Jump </p>
          <p> (Tap) ⮜ - Step Backwards </p>
          <p> (Tap) ⮞ - Step Forward </p>
          <p> (Hold) ⮞ - Run Forward </p>
          <br />
          <div className="header">
            Enemies : <br />
            AVOID AT ALL COSTS
          </div>
          <img className="pop_up_img" src={Doberman} alt="Doberman" />
          <img className="pop_up_img" src={Shiba} alt="Shiba" />
          <img className="pop_up_img" src={Crow} alt="Crow" />
          <img className="pop_up_img" src={Pigeon} alt="Pigeon" />
          <img className="pop_up_img" src={trashcan} alt="Trashcan" />
          <br />
          <br />
          <div className="header">
            Food : <br />
            EAT AS MANY AS YOU CAN
          </div>
          <img className="pop_up_img" src={goldieSprite} alt="Goldfish" />
          <img className="pop_up_img" src={salmonSprite} alt="Salmon" />
          <img className="pop_up_img" src={tunaSprite} alt="Tuna" />
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
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

export default GameInfo;
