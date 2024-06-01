import "../CSS/home.css";
import React, { useEffect, useRef } from "react";
import backgroundMusic from "../assets/music/menu.mp3";
import { Nav } from "./Nav.jsx";
import GameInfo from "./GameInfo.jsx";
import TheChonkImage from "../assets/ChonkCat/gatito_parada_espera.png";

export function Home({ userToken }) {
  const bgMusic = new Audio(backgroundMusic);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameCounterRef = useRef(0); // Counter for frame delay
  const frameDelay = 8; // Number of frames to delay animation update

  const playMusic = async () => {
    const confirmation = confirm(
      "Hurry home, Alley Cat!\n\n (Cancel to stop music.)"
    );
    if (confirmation === true) {
      try {
        bgMusic.loop = true;
        bgMusic.volume = 0.05;
        bgMusic.play();
      } catch (err) {
        console.error(err);
      }
    } else if (confirmation === false) {
      try {
        bgMusic.loop = false;
        bgMusic.pause();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stopMusic = async () => {
    try {
      bgMusic.loop = false;
      bgMusic.pause();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 720;

    class TheChonk {
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 500; // size of cats
        this.height = 420;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.image = new Image();
        this.image.src = TheChonkImage;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 5; // number of columns
        this.maxFrameY = 14; // number of rows
        this.reverse = false; // to track the direction of the animation
      }

      draw(context) {
        context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          150,
          0,
          this.width,
          this.height
        );
      }

      update() {
        frameCounterRef.current++; // Increment frame counter
        if (frameCounterRef.current >= frameDelay) { // Check if enough frames have passed
          frameCounterRef.current = 0; // Reset frame counter
          if (!this.reverse) {
            if (this.frameX < this.maxFrameX) {
              this.frameX++;
            } else if (this.frameY < this.maxFrameY) {
              this.frameX = 0;
              this.frameY++;
            } else {
              this.reverse = true;
            }
          } else {
            if (this.frameX > 0) {
              this.frameX--;
            } else if (this.frameY > 0) {
              this.frameX = this.maxFrameX;
              this.frameY--;
            } else {
              this.reverse = false;
            }
          }
        }
      }
    }

    const theChonk = new TheChonk(canvas.width, canvas.height);

    theChonk.image.onload = () => {
      const animate = () => {
        theChonk.update();
        theChonk.draw(ctx);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    };

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <h1 className="textHeader">ALLEY CAT</h1>
      <p className="alleyHome">
        In the cruel streets, we must rely on our smarts and ability to level
        our chonk.
      </p>
      <div onClick={() => stopMusic()}>
        <Nav userToken={userToken} />
        <GameInfo />
      </div>
      {/* <img src={TheChonkImage} onClick={() => playMusic()} /> */}
      <canvas ref={canvasRef} id="canvas2"></canvas>
      <br></br>
      <br></br>
    </>
  );
}

export default Home;
