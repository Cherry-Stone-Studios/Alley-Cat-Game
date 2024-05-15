import React, { useState, useEffect } from 'react';
import './index.css';
import orangeCat from './assets/orangeCat/orangeCat3.png';

const Player = () => {
  const [playerState, setPlayerState] = useState('idle');
  const [gameFrame, setGameFrame] = useState(0);

  // Handle player state change
  const handlePlayerStateChange = (e) => {
    setPlayerState(e.target.value);
  };

  // Animation function
  useEffect(() => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;

    const playerImage = new Image();
    playerImage.onload = () => {
      //Loading Image
      animate(playerImage);
    }
    playerImage.src = orangeCat;
    const spriteWidth = 48;
    const spriteHeight = 48;
    const staggerFrame = 4; // Speed of animation. Higher the number the slower the animation
    const spriteAnimations = {
      walk: [],
      idle: [],
      attack: [],
      death: [],
      hurt: [],
    };

    const animationStates = [
      { name: 'walk', frames: 6 },
      { name: 'idle', frames: 4 },
      { name: 'attack', frames: 4 },
      { name: 'death', frames: 4 },
      { name: 'hurt', frames: 2 },
    ];

    animationStates.forEach((state, index) => {
      const frames = { location: [] };
      for (let j = 0; j < state.frames; j++) {
        const positionX = j * spriteWidth;
        const positionY = index * spriteHeight; // Calculate positionY based on the current index
        frames.location.push({ x: positionX, y: positionY });
      }
      spriteAnimations[state.name] = frames;
    });

    console.log('Sprite animations:', spriteAnimations);

    // Animation loop
    const animate = (playerImage) => {
      console.log('Animating...')
      // Check if playerImage is loaded before calling drawImage
      if (!playerImage.complete) {
        // Image is not yet loaded, exit the function
        return;
      }
    
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      //Clear console.logs
      const currentAnimation = spriteAnimations[playerState];

      console.log('Current animation:', currentAnimation);

      const position = Math.floor(gameFrame / staggerFrame) % currentAnimation.location.length;
      //Clear console.logs
      console.log('Position:', position);

      const { x, y } = currentAnimation.location[position];
      //Clear console.logs
      console.log('Sprite coordinates:', x, y);

      ctx.drawImage(playerImage, x, y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

      setGameFrame((prevFrame) => prevFrame + 1);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [playerState, gameFrame]);

  return (
    <div className="game-container">
      <canvas id="canvas1" className="canvas"></canvas>
      <select id="animations" onChange={handlePlayerStateChange}>
        <option value="idle">Idle</option>
        <option value="walk">Walk</option>
        <option value="attack">Attack</option>
        <option value="death">Death</option>
        <option value="hurt">Hurt</option>
      </select>
      <div className="player"></div>
    </div>
  );
};

export default Player;
