function playClickSound() {
  const clickSound = document.getElementById('clickSound');
  clickSound.play();
}

let score = parseInt(localStorage.getItem("score")) || 0;
let rank = localStorage.getItem("rank") || "Beginner";
let clicks = 0; // Counter for clicks
let cps = 0; // Clicks per second

function handleClick() {
  score++;
  playClickSound(); // Play the click sound
  updateScore();
  checkRank();
  updateRank();
  saveUserData();
}

// Function to update CPS every second
function updateCPS() {
  cps = clicks; // Store the clicks in the past second
  clicks = 0; // Reset the click counter
  document.getElementById('cps').textContent = 'CPS: ' + cps;
}

function updateScore() {
  document.getElementById('score').textContent = 'Score: ' + score;
}

function checkRank() {
  const rankThresholds = [0, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 3000, 4000, 5000, 5250, 7500];
  const rankNames = ["Bad", "Meh", "Alright", "Good!", "Your getting somewhere!", "Awesome :)", "Geez", "Uhmm", "what", "what the fuck", "You can stop now", "Alright that's it im leaving", "Damn you really don't wanna stop huh?", "STOP!", "lalalalalalalalalalaalalalalalalaalalalalalala", "i gotta go to the toilet", "ok im back"];

  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (score >= rankThresholds[i]) {
      rank = rankNames[i];
      break;
    }
  }
}

function updateRank() {
  document.getElementById('rank').textContent = 'Rank: ' + rank;
}

function saveUserData() {
  localStorage.setItem("score", score.toString());
  localStorage.setItem("rank", rank);
}

// Event listener
document.getElementById('clickButton').addEventListener('click', handleClick);
