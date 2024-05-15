import React, { useEffect } from 'react';
import '../game_module/style.css';
import playerImage from '../game_module/Walk.png';
import backgroundImage from '../game_module/background1.jpeg';
import enemyImage from '../game_module/Dog_Black.png'

const Game = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const enemies = [];

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
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 200;
        this.height = 200;
        this.x = 10;
        this.y = this.gameHeight - this.height;
        this.image = new Image();
        this.image.src = playerImage;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
      }
      draw(context) {
        context.drawImage(
          this.image,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
      update(input) {
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
          this.frameY = 1;
        } else {
          this.vy = 0;
          this.frameY = 0;
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
        this.speed = 8;
      }
      draw(context) {
        context.drawImage(this.image, 0 * this.width, 0 * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
      }
      update() {
        this.x -= this.speed;
      }
    }

    function handleEnemies(deltaTime) {
      if (enemyTimer > enemyInterval + randomEnemyInterval) {
        enemies.push(new Enemy(canvas.width, canvas.height));
        randomEnemyInterval = Math.random() * 1000 + 500;
        enemyTimer = 0;
      } else {
        enemyTimer += deltaTime;
      }
      enemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.update();
      });
    }

    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
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
      player.draw(ctx);
      player.update(input);
      handleEnemies(deltaTime);
      requestAnimationFrame(animate);
    }
    animate();

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