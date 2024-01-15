import './index.css';
import handleFileUpload from './sections/1';
import Uploader from './sections/1';
import { drawInitialColorBook, handleGenerationProcess } from './sections/2';
import updateColorBook from './sections/3';
import main4 from './sections/4';




// Define the types for better clarity and error checking
type AnimateFunction = (star: HTMLElement) => void;

// Random number generator function
const rand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Animate function
const animate: AnimateFunction = (star: HTMLElement): void => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  // Resetting animation for re-triggering
  star.style.animation = "none";
  star.offsetHeight; // Trigger reflow to reset the animation
  star.style.animation = "";
};

// Setup for animation with timing
let index = 0,
  interval = 1000;

const stars = document.getElementsByClassName("magic-star");

for (let i = 0; i < stars.length; i++) {
  const star = stars[i] as HTMLElement; // Type cast to HTMLElement

  setTimeout(() => {
    animate(star);

    // Set interval for continuous animation
    setInterval(() => animate(star), interval);
  }, index++ * (interval / 3));
}


handleFileUpload();
handleGenerationProcess();
drawInitialColorBook();
main4();



