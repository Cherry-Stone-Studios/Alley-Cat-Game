import React, { useEffect } from 'react';
import '../game_module/style.css';
import playerImage from './assets/orangeCat/orangeCatSprite.png';
import backgroundImage from '../game_module/background1.jpeg';
import enemyImage from '../game_module/Dog_Black.png';
import animatedSprite from './SpriteAnimation.jsx';

const Game = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {
      constructor() {
        this.keys = [];
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
      }
      handleKeyDown(e) {
        if (
          (e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight') &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
      }
      handleKeyUp(e) {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight'
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      }
      removeEventListeners() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
      }
    }

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
      }
      draw(context) {
        // context.beginPath();
        // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
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
          this.height,
        );
      }

      //Can put animations based on speed. Ex: Speed 0 = idle.
      update(input, deltaTime, enemies) {
        enemies.forEach(enemy => {
          const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
          const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
          const distance = Math.sqrt(dx*dx+dy*dy);
          if (distance < enemy.width/2 + this.width/2){
            gameOver = true;
          }
        })
        if (input.keys.indexOf('ArrowRight') > -1) {
          this.speed = 5;
        } else if (input.keys.indexOf('ArrowLeft') > -1) {
          this.speed = -5;
        } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
          this.vy -= 32;
        } else {
          this.speed = 0;
        }
        this.x += this.speed;

        if (this.x < 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
        this.y += this.vy;
        if (!this.onGround()) {
          this.vy += this.weight
          //this.frameY = 1;
        } else {
          this.vy = 0;
          //this.frameY = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y - this.gameHeight - this.height
      }
      onGround() {
        return this.y >= this.gameHeight - this.height;
      }
    }

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
        this.speed = 10;
      }
      draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
      }
      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) this.x = 0;
      }
    }


    class Enemy {
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 160;
        this.height = 119;
        this.image = new Image();
        this.image.src = enemyImage;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.speed = 12;
        this.markedForDeletion = false;
      }
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
        context.drawImage(this.image, 0 * this.width, 0 * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
      }
      update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width)
          this.markedForDeletion = true;
        score++;
      }
    }

    function handleEnemies(deltaTime) {
      if (enemyTimer > enemyInterval + randomEnemyInterval) {
        enemies.push(new Enemy(canvas.width, canvas.height));
        randomEnemyInterval = Math.random() * 1000 + 500;
        console.log(enemies);
        enemyTimer = 0;
      } else {
        enemyTimer += deltaTime;
      }
      enemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.update(deltaTime);
      });
      enemies = enemies.filter(enemy => !enemy.markedForDeletion)
    }

    function displayStatusText(context) {
      context.fillStyle = 'yellow';
      context.font = '40px Helvetica';
      context.fillText('Score: ' + score, 50, 110);
      if (gameOver){
        context.textAlign = 'center';
        context.fillStyle = 'yellow';
        context.fillText('GAME OVER, try again!', canvas.width/2, 200);
      }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height, 'orangeCat');
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    const enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background.draw(ctx);
      background.update();
      animatedSprite(player, "walk", "walk");
      player.draw(ctx);
      player.update(input, deltaTime, enemies);
      handleEnemies(deltaTime);
      displayStatusText(ctx);
      if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

    return () => {
      input.removeEventListeners();
    };
  }, []);

  return (
    <div>
      <canvas id="canvas1"></canvas>
    </div>
  )

}

export default Game;