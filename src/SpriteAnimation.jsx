import "./index.css";
import orangeCatImage from './assets/orangeCat/orangeCatSprite.png';
import blackCatImage from './assets/blackCat/blackCatSprite.png';
import dobermanDogImage from './assets/dogDoberman/dobermanDogSprite.png';
import shibaDogImage from './assets/dogShiba/shibaDogSprite.png';



const characterSprite = [
  {
    sprite: "orangeCat",
    imgSource: orangeCatImage,
    SpriteDimensions: {
      width: 100,
      height: 80,
      spriteWidth: 47,
      spriteHeight: 30,
    },
    animationStates: [
      { name: "walk", frames: 5, row: 0, speed: 6 },
      { name: "idle", frames: 3, row: 1, speed: 10 },
      { name: "attack", frames: 3, row: 2, speed: 10 },
      { name: "death", frames: 3, row: 3, speed: 10 },
      { name: "hurt", frames: 1, row: 4, speed: 10 },
    ],
  },
  {
    sprite: "blackCat",
    imgSource: blackCatImage,
    SpriteDimensions: {
      width: 110,
      height: 80,
      spriteWidth: 47,
      spriteHeight: 23,
    },
    animationStates: [
      { name: "walk", frames: 5, row: 0, speed: 6 },
      { name: "idle", frames: 3, row: 1, speed: 10 },
      { name: "attack", frames: 3, row: 2, speed: 10 },
      { name: "death", frames: 3, row: 3, speed: 10 },
      { name: "hurt", frames: 1, row: 4, speed: 10 },
    ],
  },
  {
    sprite: "dobermanDog",
    imgSource: dobermanDogImage,
    SpriteDimensions: {
      width: 120,
      height: 100,
      spriteWidth: 48,
      spriteHeight: 34,
    },
    animationStates: [
      { name: "walk", frames: 5, row: 0, speed: 6 },
      { name: "attack", frames: 3, row: 1, speed: 10 },
    ],
  },
  {
    sprite: "shibaDog",
    imgSource: shibaDogImage,
    SpriteDimensions: {
      width: 110,
      height: 90,
      spriteWidth: 48,
      spriteHeight: 28,
    },
    animationStates: [
      { name: "walk", frames: 5, row: 0, speed: 6 },
      { name: "attack", frames: 3, row: 1, speed: 10 },
    ],
  },
];


const animatedSprite = (player, currState, prevState) => { //player, walk, walk from game.jsx
  let currRow = 0;
  let maxFrames = 0;
  let speed = 0;
  
  characterSprite.forEach((animal) => {
    if(animal.sprite === player.sprite) {
      animal.animationStates.forEach((state) => {
        //Need to animate through picture grabbing state.frames and speed to control them
        if (state.name === currState) { //Finding current state information, if it is, keep going on that row
          currRow = state.row; // animationStates.row
          maxFrames = (state.frames + 1) * state.speed - 1;
          speed = state.speed;
  
          return;
        }
      });
      //Updating variables
      player.image.src = animal.imgSource;
      player.width = animal.SpriteDimensions.width;
      player.height = animal.SpriteDimensions.height;
      player.spriteWidth = animal.SpriteDimensions.spriteWidth;
      player.spriteHeight = animal.SpriteDimensions.spriteHeight;
    }
  })


  if(player.spriteDirection === 'right'){
    if (currState != prevState) {
      player.frameCount = 0;
      player.frameY = currRow;
    } else if (player.frameCount < maxFrames) {
      player.frameCount++;
    } else {
      player.frameCount = 0;
    }
  } else {
    if (currState != prevState) {
      player.frameCount = maxFrames;
      player.frameY = currRow;
    } else if (player.frameCount > 0 ) {
      player.frameCount--;
    } else {
      player.frameCount = maxFrames;
    }
  }
player.frameX = Math.floor(player.frameCount / speed);
console.log(player.frameX, player.frameCount, player.spriteDirection)
};

export default animatedSprite;
