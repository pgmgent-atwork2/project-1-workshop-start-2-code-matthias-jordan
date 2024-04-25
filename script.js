const hole = document.getElementById("hole");
const character = document.getElementById("character");
const block = document.getElementById("block");
let counter = 0;
let jumping = false;
const scoreDisplay = document.getElementById("counter");

const jump = () => {
  if (!jumping) {
    jumping = true;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      const characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      if (characterTop > 6 && jumpCount < 15) {
        character.style.top = characterTop - 5 + "px";
      }
      if (jumpCount > 20) {
        clearInterval(jumpInterval);
        jumping = false;
      }
      jumpCount++;
    }, 10);
    // Speel het geluid af
    jumpSound.play();
  }
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !jumping) {
    jump();
  }
});

const updateHolePosition = () => {
  const random = -(Math.random() * 300 + 150);
  hole.style.top = random + "px";
  counter++;
  scoreDisplay.textContent = counter - 1; // Update the live score display
};

const gameOver = () => {
  // Speel het game over geluid af
  gameOverSound.play();
  // Toon een prompt met het scorebericht
  alert(`Game over! Your score: ${counter - 1}`);
  character.style.top = 100 + "px";
  counter = 0;
  scoreDisplay.textContent = counter - 1; // Reset the score display
};

setInterval(() => {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  if (!jumping) {
    character.style.top = characterTop + 3 + "px";
  }
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  const holeTop = parseInt(
    window.getComputedStyle(hole).getPropertyValue("top")
  );
  const cTop = -(500 - characterTop);
  if (
    characterTop > 500 ||
    (blockLeft < 20 &&
      blockLeft > -50 &&
      (cTop < holeTop || cTop > holeTop + 130))
  ) {
    // Roep gameOver aan
    gameOver();
  }
}, 10);

hole.addEventListener("animationiteration", updateHolePosition);
