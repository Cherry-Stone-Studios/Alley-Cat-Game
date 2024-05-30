import React from "react";
import Popup from "reactjs-popup";
import "../CSS/GameInfo.css";

const GameInfo = () => (
  <Popup
    trigger={<button className="Button"> HOW TO PLAY </button>}
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
          {" "}
          <p>⮝ - Jump </p>
          <p>⮝ + ⮝ - Double Jump </p>
          <br />
          <p>⮟</p>
          <br />
          <p>⮜</p>
          <br />
          <p>⮞</p>
        </div>
        <div className="actions">
          {/* <Popup
					// Add trigger if additional information is needed
            // trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup> */}
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default GameInfo;

// const GameInfo = () => {
//   return (
//     <>
//       <h1>How To Play</h1>
//       <h3>Intro</h3>
//       <p>
//         In this thrilling platformer adventure, you play as a hungry but
//         determined alley cat, navigating through the bustling city streets. Leap
//         over obstacles, avoid dangers, and outsmart mischievous foes as you
//         journey through vibrant neighborhoods. Your ultimate goal? To reach the
//         end of the street and find your new home with a warm and loving family.
//         Are you ready to embark on this heartwarming quest and find a place to
//         call your own? Let the adventure begin!
// 			</p>
// 			<h3>Controls</h3>

//     </>
//   );
// };
