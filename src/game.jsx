// import css and other .jsx pages
import React, { useEffect } from "react";
import "./CSS/background.css";
import animatedSprite from "./SpriteAnimation.jsx";
// import background images
import playerImage from "./assets/orangeCat/orangeCatSprite.png";
import backgroundImage from "./assets/backgrounds/City2.png";
import tvBackground from "./assets/backgrounds/arcade.webp";
// import bag guys
import enemyImage from "./assets/dogDoberman/Dog_Black.png";
import flyingEnemy from "./assets/birdSprites/blackCrowSprite.png";
import trashObstacle from "./assets/badGuys/trashcan.png";
// import fishies
import food1 from "./assets/Fish/goldieSprite.png";
// import music and noises
import backgroundMusic from "./assets/music/running90s.mp3";
import gameoverMeow from "./assets/music/angrycatmeow.mp3";
// gifs
// import catPiano from "./assets/gifs/catpiano.gif";
// import catScratch from "./assets/gifs/catscratch.gif";
// import curiousCat from "./assets/gifs/curiouscat.gif";
// import flyingCat from "./assets/game_module/flyingcat.jpg";
// import pixelCat from "./assets/gifs/pixel-cat.gif";

const Game = ({ submitHighScore }) => {
  useEffect(() => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let chonkMeter = 0;
    let gameOver = false;
    const numberOfEnemies = 10;
    let flyingEnemiesArray = [];
    let flyingEnemyTimer = 0;
    const flyingEnemyInterval = 5000; // Adjust this value to control the spawn rate
    let randomFlyingEnemyInterval = Math.random() * 1000 + 500;
    let trashObstacleArray = [];
    let trashObstacleTimer = 0;
    const trashObstacleInterval = 10000;
    let randomTrashObstacleInterval = Math.random() * 1000 + 500;
    let foodArray = [];
    let foodTimer = 0;
    const foodInterval = 6000;
    let randomFoodInterval = Math.random() * 1000 + 500;

    const bgMusic = new Audio(backgroundMusic);
    bgMusic.loop = true;
    bgMusic.volume = 0.4;
    bgMusic.play();
    const angryMeow = new Audio(gameoverMeow);
    angryMeow.volume = 0.1;
    angryMeow.loop = false;

    //Handles any keyboard inputs from the player
    class InputHandler {
      constructor() {
        this.keys = [];
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
      }
      //Adds keys to an array when pressed, restarts game if enter is pressed while game is over
      handleKeyDown(e) {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        } else if (e.key === "Enter" && gameOver) restartGame();
      }
      //Removes key from the keys array when the button is released
      handleKeyUp(e) {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      }

      isAnyKeyPressed() {
        return this.keys.length > 0;
      }

      //Removes event listeners when component is unmounted
      removeEventListeners() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
      }
    }

    //Class representing the player character, the kitty
    class Player {
      constructor(gameWidth, gameHeight, sprite) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 120; // size of cats
        this.height = 100;
        this.spriteWidth = 47;
        this.spriteHeight = 30;
        this.x = 10;
        this.y = this.gameHeight - this.height;
        this.image = new Image();
        this.image.src = playerImage;
        this.frameX = 0;
        this.frameY = 0; //Row that cat starts out as
        this.frameCount = 0;
        this.speed = 0;
        this.vy = 0;
        this.weight = 2;
        this.sprite = sprite; //Identity: ex 'orangeCat'
        this.spriteDirection = "right";
        this.currAction = "walk";
        this.stateChange = true;
        this.jumpCount = 0; // Add jump count for double jump
        this.foodCount = 0;
      }

      //Resets player position and frame Y to initial values upon restart
      restart() {
        this.x = 10;
        this.y = this.gameHeight - this.height;
        this.frameY = 0;
        this.vy = 0;
        this.jumpCount = 0; // Reset jump count
      }

      //Draws the player on the canvas the game is using
      draw(context) {
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }

      //Can put animations based on speed. Ex: Speed 0 = idle.
      //Updates player position and handles collisions with enemies

      update(
        input,
        deltaTime,
        enemies,
        flyingEnemiesArray,
        trashObstacleArray,
        foodArray
      ) {
        // Handle collisions
        this.handleCollisions(
          enemies,
          flyingEnemiesArray,
          trashObstacleArray,
          foodArray
        );

        // Handle horizontal movement
        if (input.keys.indexOf("ArrowRight") > -1) {
          if (this.onGround()) {
            this.speed = 5; // Normal speed on ground
            score++;
          } else {
            this.speed = 9; // Increased speed during jump
            score++;
          }
          this.currAction = "walk";
        } else if (input.keys.indexOf("ArrowLeft") > -1) {
          if (this.onGround()) {
            this.speed = -5; // Normal speed on ground
          } else {
            this.speed = -9; // Increased speed during jump
          }
          this.currAction = "walk";
        } else {
          this.speed = 0;
          this.currAction = "idle";
        }

        // Handle jumping and double jumping
        if (input.keys.indexOf("ArrowUp") > -1 && !this.jumpPressed) {
          if (this.onGround() && this.jumpCount === 0) {
            this.vy = -32; // Initial jump velocity
            this.jumpCount = 1;
            this.jumpPressed = true;
            score++;
          } else if (this.jumpCount === 1) {
            this.vy = -32; // Double jump velocity
            this.jumpCount = 2;
            this.jumpPressed = true;
          }
        }

        if (input.keys.indexOf("ArrowUp") === -1) {
          this.jumpPressed = false;
        }

        // Apply vertical velocity (gravity)
        this.vy += this.weight;

        // Ensure player stays within game bounds vertically
        this.y += this.vy;
        if (this.y > this.gameHeight - this.height) {
          this.y = this.gameHeight - this.height;
          this.vy = 0;
          this.jumpCount = 0; // Reset jump count when on ground
        }

        // Apply horizontal movement
        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > this.gameWidth / 1.5 - this.width)
          this.x = this.gameWidth / 1.5 - this.width;

        // Log to debug
        console.log(
          `x: ${this.x}, y: ${this.y}, vy: ${this.vy}, jumpCount: ${this.jumpCount}`
        );
      }

      isHalfwayAcross() {
        return this.x >= this.gameWidth / 3;
      }

      handleCollisions(
        enemies,
        flyingEnemiesArray,
        trashObstacleArray,
        foodArray
      ) {
        // Function to check for circular collision
        const checkCircularCollision = (circle1, circle2) => {
          const dx = circle1.x - circle2.x;
          const dy = circle1.y - circle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < circle1.radius + circle2.radius;
        };

        // Define the player's circular hitbox
        const playerHitbox = {
          x: this.x + this.width / 2,
          y: this.y + this.height / 2,
          radius: Math.min(this.width, this.height) / 2.75,
        };

        // Handle collisions with enemies
        enemies.forEach((enemy) => {
          // Define the enemy's circular hitbox closer to the front
          const enemyHitbox = {
            x: enemy.x + enemy.width * 0.8, // Adjust position to focus more on the front
            y: enemy.y + enemy.height / 2,
            radius: Math.min(enemy.width, enemy.height) / 2.75,
          };

          if (checkCircularCollision(playerHitbox, enemyHitbox)) {
            gameOver = true;
            this.currAction = "death";
            this.deathFrameCounter = 4; // Set death frame counter
          }
        });

        // Handle collisions with flying enemies
        flyingEnemiesArray.forEach((flyingenemy) => {
          // Define the flying enemy's circular hitbox closer to the front
          const flyingEnemyHitbox = {
            x: flyingenemy.x + flyingenemy.width * 0.8, // Adjust position if needed
            y: flyingenemy.y + flyingenemy.height / 2,
            radius: Math.min(flyingenemy.width, flyingenemy.height) / 2.75,
          };

          if (checkCircularCollision(playerHitbox, flyingEnemyHitbox)) {
            gameOver = true;
            this.currAction = "death";
            this.deathFrameCounter = 4; // Set death frame counter
          }
        });

        // Handle collisions with trashcans
        trashObstacleArray.forEach((trashObstacle) => {
          // Define the trash obstacle's circular hitbox closer to the front
          const trashObstacleHitbox = {
            x: trashObstacle.x + trashObstacle.width * 0.8, // Adjust position if needed
            y: trashObstacle.y + trashObstacle.height / 2,
            radius: Math.min(trashObstacle.width, trashObstacle.height) / 2.75,
          };

          if (checkCircularCollision(playerHitbox, trashObstacleHitbox)) {
            gameOver = true;
            this.currAction = "death";
            this.deathFrameCounter = 4; // Set death frame counter
          }
        });

        // Handle collisions with food
        foodArray.forEach((food) => {
          const foodHitbox = {
            x: food.x + food.width / 2,
            y: food.y + food.height / 2,
            radius: Math.min(food.width, food.height) / 2,
          };

          if (checkCircularCollision(playerHitbox, foodHitbox)) {
            food.markedForDeletion = true;
            chonkMeter++;
          }
        });
      }

      onGround() {
        return this.y >= this.gameHeight - this.height;
      }
    }

    //Represents our game's background
    class Background {
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = new Image();
        this.image.src = backgroundImage;
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 720;
        this.speed = 8;
      }
      //Draws the background on the canvas
      draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(
          this.image,
          this.x + this.width - this.speed,
          this.y,
          this.width,
          this.height
        );
      }
      //Updates the background position
      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) this.x = 0;
      }
      //Restarts background position
      restart() {
        this.x = 0;
      }
    }

    //Represents the enemies in our game
    class Enemy {
      constructor(gameWidth, gameHeight, sprite) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 160;
        this.height = 110;
        this.spriteWidth = 47;
        this.spriteHeight = 30;
        this.image = new Image();
        this.image.src = enemyImage;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.currAction = Math.random() < 0.5 ? "walk" : "attack";
        this.speed = this.currAction === "walk" ? 8 : 5;
        this.frameCount = 0;
        this.markedForDeletion = false;
        this.sprite = sprite;
        this.spriteDirection = "left";
        this.weight = 1;
        this.vy = 0;
        this.stateChange = true;
      }
      //Draws the enemy on the canvas
      draw(context) {
        // context.strokeStyle = 'white';
        // context.strokeRect(this.x, this.y, this.width, this.height);
        // context.beginPath();
        // context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        // context.stroke();
        // context.strokeStyle = 'blue';
        // context.beginPath();
        // context.arc(this.x, this.y, this.height / 2, this.width / 2, 0, Math.PI * 2);
        // context.stroke();
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
      //Updates enemy position and marks for deletion if off-screen
      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
          this.markedForDeletion = true;
          score++;
        }
        this.y += this.vy;
        if (!this.onGround()) {
          this.vy += this.weight;
          //this.frameY = 1;
        } else {
          this.vy = 0;
          //this.frameY = 0;
        }
        if (this.y > this.gameHeight - this.height)
          this.y - this.gameHeight - this.height;
      }
      onGround() {
        return this.y >= this.gameHeight - this.height;
      }
    }

    class FlyingEnemy {
      constructor(gameWidth, gameHeight, sprite) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.spriteWidth = 33;
        this.spriteHeight = 15;
        this.width = 55;
        this.height = 55;
        this.x = gameWidth;
        this.frameX = 0;
        this.frameY = 0;
        this.y = Math.random() * (gameHeight / 4) + gameHeight / 4;
        this.image = new Image();
        this.sprite = sprite;
        this.image.src = flyingEnemy;
        this.markedForDeletion = false;
        this.spriteDirection = "left";
        this.currAction = "walk";
        this.speed = Math.random() * 11 + 1;
        this.stateChange = true;
        this.frameCount = 0;
      }
      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
          this.markedForDeletion = true;
          score++;
        }
        // this.x += this.speed;
        // this.y += this.speed;
        //this.x += Math.random() * 15 - 2.5;
        //this.y += Math.random() * 5 - 2.5;
      }
      draw(context) {
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
    }

    for (let i = 0; i < numberOfEnemies; i++) {
      flyingEnemiesArray.push(new FlyingEnemy(canvas.width, canvas.height));
    }

    class TrashObstacle {
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 100;
        this.height = 100;
        this.x = gameWidth;
        this.y = gameHeight - this.height; // Ground level
        this.image = new Image();
        this.image.src = trashObstacle;
        this.speed = 5;
        this.markedForDeletion = false;
      }

      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
          this.markedForDeletion = true;
          score++;
        }
      }

      draw(context) {
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

    class Food {
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 50; // size of food
        this.height = 50;
        this.x = gameWidth;
        this.y = gameHeight - this.height;
        this.image = new Image();
        this.image.src = food1;
        this.speed = 4;
        this.markedForDeletion = false;
      }

      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
          this.markedForDeletion = true;
        }
      }

      draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

    //Handles creating and updating enemies
    function handleEnemies(deltaTime) {
      if (enemyTimer > enemyInterval + randomEnemyInterval) {
        const enemyType = Math.random() < 0.5 ? "dobermanDog" : "shibaDog";
        enemies.push(new Enemy(canvas.width, canvas.height, enemyType));
        randomEnemyInterval = Math.random() * 1000 + 500;
        console.log(enemies);
        enemyTimer = 0;
      } else {
        enemyTimer += deltaTime;
      }
      enemies.forEach((enemy) => {
        animatedSprite(enemy);
        enemy.draw(ctx);
        enemy.update(deltaTime);
      });
      enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
    }

    function handleFlyingEnemies(deltaTime) {
      if (flyingEnemyTimer > flyingEnemyInterval + randomFlyingEnemyInterval) {
        const flyingEnemyType =
          Math.random() < 0.5 ? "blackCrow" : "regularPigeon";
        flyingEnemiesArray.push(
          new FlyingEnemy(canvas.width, canvas.height, flyingEnemyType)
        );
        randomFlyingEnemyInterval = Math.random() * 1000 + 500;
        flyingEnemyTimer = 0;
      } else {
        flyingEnemyTimer += deltaTime;
      }
      flyingEnemiesArray.forEach((enemy) => {
        animatedSprite(enemy);
        enemy.draw(ctx);
        enemy.update(deltaTime);
      });
      flyingEnemiesArray = flyingEnemiesArray.filter(
        (enemy) => !enemy.markedForDeletion
      );
    }

    function handleTrashObstacles(deltaTime) {
      if (
        trashObstacleTimer >
        trashObstacleInterval + randomTrashObstacleInterval
      ) {
        trashObstacleArray.push(new TrashObstacle(canvas.width, canvas.height));
        randomTrashObstacleInterval = Math.random() * 1000 + 500;
        trashObstacleTimer = 0;
      } else {
        trashObstacleTimer += deltaTime;
      }
      trashObstacleArray.forEach((obstacle) => {
        obstacle.update();
        obstacle.draw(ctx);
      });
      trashObstacleArray = trashObstacleArray.filter(
        (obstacle) => !obstacle.markedForDeletion
      );
    }

    function handleFood(deltaTime, player) {
      if (foodTimer > foodInterval + randomFoodInterval) {
        foodArray.push(new Food(canvas.width, canvas.height));
        randomFoodInterval = Math.random() * 1000 + 500;
        foodTimer = 0;
      } else {
        foodTimer += deltaTime;
      }

      foodArray.forEach((food) => {
        food.update();
        food.draw(ctx);
      });

      player.handleCollisions([], [], [], foodArray);

      // Update player food count and state based on chonkMeter
      player.foodCount = chonkMeter;

      // Remove marked food from the array
      foodArray = foodArray.filter((food) => !food.markedForDeletion);
    }

    // When the game is over and a player dies
    // Display the score and game over text
    function displayStatusText(context) {
      context.fillStyle = "yellow";
      context.font = "40px Helvetica";
      context.textAlign = "left";
      context.fillText("High Score: " + score + chonkMeter * 2, 50, 110);
      context.fillStyle = "yellow";
      context.font = "40px Helvetica";
      context.textAlign = "left";
      context.fillText("Chonk Meter: " + chonkMeter, 50, 150);
      if (gameOver) {
        context.textAlign = "center";
        context.fillStyle = "yellow";
        context.fillText("GAME OVER, try again!", canvas.width / 2, 200);
        context.fillText("Press Enter to Restart", canvas.width / 2, 250);
        angryMeow.play();
        bgMusic.pause();
        submitHighScore(score + chonkMeter * 2);
      }
    }

    //Restarts the game by resetting player, background, enemies and score
    function restartGame(ctx) {
      player.restart();
      background.restart();
      enemies = [];
      flyingEnemiesArray = [];
      trashObstacleArray = [];
      foodArray = [];
      score = 0;
      chonkMeter = 0;
      gameOver = false;
      bgMusic.play();
      animate(0);
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height, "orangeCat");
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    const enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    //Main game loop: updates and renders game objects
    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // if (input.isAnyKeyPressed()) {
      //   background.speed = 8;
      // } else {
      //   background.speed = 0;
      // }
      if (player.isHalfwayAcross() && input.isAnyKeyPressed()) {
        background.speed = 8;
      } else {
        background.speed = 0;
      }
      background.draw(ctx);
      background.update();
      animatedSprite(player);
      player.draw(ctx);
      player.update(
        input,
        deltaTime,
        enemies,
        flyingEnemiesArray,
        trashObstacleArray,
        foodArray
      );
      handleEnemies(deltaTime);
      handleFlyingEnemies(deltaTime);
      handleTrashObstacles(deltaTime);
      handleFood(deltaTime, player);
      displayStatusText(ctx);
      if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

    return () => {
      input.removeEventListeners();
    };
  }, []);

  return (
    <div className="arcadeBox">
      <div className="gameBox"></div>
      <div className="shiftDown">
        <canvas id="canvas1"></canvas>
      </div>
    </div>
  );
};

export default Game;
