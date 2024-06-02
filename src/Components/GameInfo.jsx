import "../CSS/gameinfo.css";
import React from "react";
import Popup from "reactjs-popup";
import Shiba from "../assets/dogShiba/Shiba.png";
import Crow from "../assets/Bird/Crow.png";
import trashcan from "../assets/Can/trashcan.png";
import Pigeon from "../assets/Bird/Pigeon.png";
import goldieSprite from "../assets/fish/goldieSprite.png";
import salmonSprite from "../assets/fish/salmonSprite.png";
import tunaSprite from "../assets/fish/tunaSprite.png";
import Doberman from "../assets/dogDoberman/Doberman.png";

const GameInfo = () => (
  //Creates a button that renders a pop up menu when clicked
  <Popup
    trigger={<button className="button"> HOW TO PLAY </button>}
    modal
    nested
  >
    {(close) => (
      <div className="infomodal">
        <button className="infoclose" onClick={close}>
          &times;
        </button>
        <div className="infoheader"> HOW TO PLAY </div>
        <div className="infocontent">
          <div className="infoheader"> Controls : </div>
          <p> ⮝ - Jump </p>
          <p> ⮝ + ⮝ - Double Jump </p>
          <p> (Tap) ⮜ - Step Backwards </p>
          <p> (Tap) ⮞ - Step Forward </p>
          <p> (Hold) ⮞ - Run Forward </p>
          <br />
          <div className="infoheader">
            Enemies : <br />
            AVOID AT ALL COSTS
          </div>
          <img className="infopop_up_img" src={Doberman} alt="Doberman" />
          <img className="infopop_up_img" src={Shiba} alt="Shiba" />
          <img className="infopop_up_img" src={Crow} alt="Crow" />
          <img className="infopop_up_img" src={Pigeon} alt="Pigeon" />
          <img className="infopop_up_img" src={trashcan} alt="Trashcan" />
          <br />
          <br />
          <div className="infoheader">
            Food : <br />
            EAT AS MANY AS YOU CAN
          </div>
          <img className="infopop_up_img" src={goldieSprite} alt="Goldfish" />
          <img className="infopop_up_img" src={salmonSprite} alt="Salmon" />
          <img className="infopop_up_img" src={tunaSprite} alt="Tuna" />
        </div>
        <div className="infoactions">
          <button
            className="infobutton"
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
