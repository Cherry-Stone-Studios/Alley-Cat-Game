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

    function animate() {

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