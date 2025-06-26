const colorDisplay = document.getElementById("color-display");
const colorOptions = document.getElementById("color-options");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");

let colors = [];
let pickedColor;
let level = 1;

const correctSounds = ["🎉 Woohoo!", "🎯 You nailed it!", "✅ Correct! You're amazing!", "🌟 Great job!"];
const wrongSounds = ["😅 Oops!", "❌ Not quite, try again!", "🙈 Missed it!", "😬 So close!"];

function playSound(isCorrect) {
  const audio = new Audio(isCorrect ? "https://cdn.pixabay.com/download/audio/2022/03/15/audio_34b6b28cd1.mp3" : "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c1b2b2eb2c.mp3");
  audio.play();
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(generateRandomColor());
  }
  return arr;
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function setupGame() {
  colors = generateColors(6);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor.toUpperCase();
  colorOptions.innerHTML = "";

  colors.forEach(color => {
    const div = document.createElement("div");
    div.classList.add("color-box");
    div.style.backgroundColor = color;
    div.addEventListener("click", function () {
      if (this.style.backgroundColor === pickedColor) {
        message.textContent = correctSounds[Math.floor(Math.random() * correctSounds.length)];
        playSound(true);
        document.querySelectorAll(".color-box").forEach(box => {
          box.style.backgroundColor = pickedColor;
          box.style.opacity = 1;
          box.style.transform = "scale(1.1)";
        });
        level++;
        resetBtn.textContent = `🎮 Next Level (${level})`;
      } else {
        this.style.opacity = 0;
        message.textContent = wrongSounds[Math.floor(Math.random() * wrongSounds.length)];
        playSound(false);
      }
    });
    colorOptions.appendChild(div);
  });

  message.textContent = "";
}

resetBtn.addEventListener("click", setupGame);

// Initialize game
setupGame();
