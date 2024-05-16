import React, { useState, useEffect } from 'react';
import './index.css';
// import orangeCat from './assets/orangeCat/orangeCatSprite.png';

const orangeCat = {
  SpriteDimensions: {
    width: 100,
    height: 80,
    spriteWidth: 47,
    spriteHeight: 30
  },
  animationStates : [
    { name: 'walk', frames: 5, row: 0, speed: 6 },
    { name: 'idle', frames: 3, row: 1, speed: 10 },
    { name: 'attack', frames: 3, row: 2, speed: 10 },
    { name: 'death', frames: 3, row: 3, speed: 10 },
    { name: 'hurt', frames: 1, row: 4, speed: 10 },
  ]
}

const animatedSprite = (player, currState, prevState) => {
  let currRow = 0;
  let maxFrames = 0;
  let speed = 0;
  
  if(player.sprite === "orangeCat") {
    orangeCat.animationStates.forEach((state) => {
      if(state.name === currState){
        currRow = state.row;
        maxFrames = (state.frames + 1 ) * state.speed;
        speed = state.speed;

        return;
      }
      
    })
    player.width = orangeCat.SpriteDimensions.width;
    player.height = orangeCat.SpriteDimensions.height;
    player.spriteWidth = orangeCat.SpriteDimensions.spriteWidth;
    player.spriteHeight = orangeCat.SpriteDimensions.spriteHeight;
  }

  if(currState != prevState){
    player.frameX = 0;
    player.frameY = currRow; 
  } else if (player.frameCount < maxFrames) {
    player.frameX = Math.floor(player.frameCount / speed);
    player.frameCount ++;
  } else {
    player.frameCount = 0;
  }

}



// const Player = () => {
//   const [playerState, setPlayerState] = useState('idle');
//   const [gameFrame, setGameFrame] = useState(0);
  
//   // Handle player state change
//   const handlePlayerStateChange = (e) => {
//     setPlayerState(e.target.value);
//   };

//   // Animation function
//   useEffect(() => {
//     const canvas = document.getElementById('canvas1');
//     const ctx = canvas.getContext('2d');
//     const CANVAS_WIDTH = canvas.width = 600;
//     const CANVAS_HEIGHT = canvas.height = 600;

//     const playerImage = new Image();
//     playerImage.onload = () => {
//       //Loading Image
//       animate(playerImage);
//     }
//     playerImage.src = orangeCat;
//     const spriteWidth = 47;
//     const spriteHeight = 30;
//     const staggerFrame = 4; // Speed of animation. Higher the number the slower the animation
//     const spriteAnimations = {
//       walk: [],
//       idle: [],
//       attack: [],
//       death: [],
//       hurt: [],
//     };

//     const animationStates = [
//       { name: 'walk', frames: 6 },
//       { name: 'idle', frames: 4 },
//       { name: 'attack', frames: 4 },
//       { name: 'death', frames: 4 },
//       { name: 'hurt', frames: 2 },
//     ];

//     animationStates.forEach((state, index) => {
//       const frames = { location: [] };
//       for (let j = 0; j < state.frames; j++) {
//         const positionX = j * spriteWidth;
//         const positionY = index * spriteHeight; // Calculate positionY based on the current index
//         frames.location.push({ x: positionX, y: positionY });
//       }
//       spriteAnimations[state.name] = frames;
//     });

//     // console.log('Sprite animations:', spriteAnimations);

//     // Animation loop
//     const animate = (playerImage) => {
//       // console.log('Animating...')
//       // Check if playerImage is loaded before calling drawImage
//       if (!playerImage.complete) {
//         // Image is not yet loaded, exit the function
//         return;
//       }
    
//       ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//       //Clear console.logs
//       const currentAnimation = spriteAnimations[playerState];

//       console.log('Current animation:', currentAnimation);

//       const position = Math.floor(gameFrame / staggerFrame) % currentAnimation.location.length;
//       //Clear console.logs
//       // console.log('Position:', position);

//       const { x, y } = currentAnimation.location[position];
//       //Clear console.logs
//       // console.log('Sprite coordinates:', x, y);

//       ctx.drawImage(playerImage, x, y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

//       setGameFrame((prevFrame) => prevFrame + 1);
//     };

//     const animationId = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, [playerState, gameFrame]);

//   return (
//     <div className="game-container">
//       <canvas id="canvas1" className="canvas"></canvas>
//       <select id="animations" onChange={handlePlayerStateChange}>
//         <option value="idle">Idle</option>
//         <option value="walk">Walk</option>
//         <option value="attack">Attack</option>
//         <option value="death">Death</option>
//         <option value="hurt">Hurt</option>
//       </select>
//       <div className="player"></div>
//     </div>
//   );
// };

export default animatedSprite;
