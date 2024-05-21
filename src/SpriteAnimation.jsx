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
      width: 160,
      height: 140,
      spriteWidth: 48,
      spriteHeight: 34,
    },
    animationStates: [
      { name: "walk", frames: 5, row: 0, speed: 6 },
      { name: "attack", frames: 3, row: 1, speed: 6 },
    ],
  },
  {
    sprite: "shibaDog",
    imgSource: shibaDogImage,
    SpriteDimensions: {
      width: 150,
      height: 120,
      spriteWidth: 48,
      spriteHeight: 28,
    },
    animationStates: [
      { name: "walk", frames: 5, row: 0, speed: 6 },
      { name: "attack", frames: 3, row: 1, speed: 6 },
    ],
  },
];

const animatedSprite = (player, currState, prevState) => {
  let isCat = true; // Flag to check if the player is a cat

  characterSprite.forEach((animal) => {
    if (animal.sprite === player.sprite) {
      isCat = false; // The player is not a cat
      if (animal.sprite.startsWith('doberman') || animal.sprite.startsWith('shiba')) {
        // Set the initial random state if not already set
        if (!player.randomState) {
          player.randomState = Math.random() < 0.8 ? "walk" : "attack"; // 80% chance for "walk", 20% for "attack"
        }
        animatedSpriteHelper(player, player.randomState, prevState);
        return; // Exit the loop once the state is set
      }
      // For cats, use the original animation behavior
      animatedSpriteHelper(player, currState, prevState);
    }
  });

  if (isCat) {
    // For cats, use the original animation behavior
    animatedSpriteHelper(player, currState, prevState);
  }
};

const animatedSpriteHelper = (player, currState, prevState) => {
  let currRow = 0;
  let maxFrames = 0;
  let speed = 0;

  characterSprite.forEach((animal) => {
    if (animal.sprite === player.sprite) {
      animal.animationStates.forEach((state) => {
        if (state.name === currState) {
          currRow = state.row;
          maxFrames = state.frames;
          speed = state.speed;
          return;
        }
      });
      player.image.src = animal.imgSource;
      player.width = animal.SpriteDimensions.width;
      player.height = animal.SpriteDimensions.height;
      player.spriteWidth = animal.SpriteDimensions.spriteWidth;
      player.spriteHeight = animal.SpriteDimensions.spriteHeight;
    }
  });

  if (currState !== prevState) {
    player.frameCount = 0;
    player.frameY = currRow;
  }

  if (player.spriteDirection === 'right') {
    player.frameCount += 1;
    if (player.frameCount >= maxFrames * speed) {
      player.frameCount = 0;
    }
  } else {
    player.frameCount -= 1;
    if (player.frameCount < 0) {
      player.frameCount = maxFrames * speed - 1;
    }
  }

  player.frameX = Math.floor(player.frameCount / speed);
};

export default animatedSprite;

