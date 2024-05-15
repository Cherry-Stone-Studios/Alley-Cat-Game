import React, { useEffect } from 'react';
import '../game_module/style.css';
import playerImage from '../game_module/Walk.png'

const Game = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;

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
      constructor(gameWidth, gameHeight){
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
        if(input.keys.indexOf('ArrowRight') > -1){
          this.speed = 5;
        } else if (input.keys.indexOf('ArrowLeft') > -1) {
          this.speed = -5;
        } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
          this.vy -= 32;
        } else {
          this.speed = 0;
        }
        this.x += this.speed;

        if (this.x <0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
        this.y += this.vy;
        if (!this.onGround()){
          this.vy += this.weight
          this.frameY = 1;
        } else {
          this.vy = 0;
          this.frameY = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y - this.gameHeight - this.height
      }
      onGround(){
        return this.y >= this.gameHeight - this.height;
      }
    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies() {

    }

    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    function animate() {
      ctx.clearRect(0,0,canvas.width, canvas.height);
      player.draw(ctx);
      player.update(input);
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