function playClickSound() {
  const clickSound = document.getElementById('clickSound');
  clickSound.play();
}
let score = parseInt(localStorage.getItem("score")) || 0;
let rank = localStorage.getItem("rank") || "Beginner";
let currentUser = localStorage.getItem("currentUser") || null;
let userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
let clicks = 0; // Counter for clicks
let cps = 0; // Clicks per second

function handleClick() {
  if (currentUser !== null) {
    score++;
    playClickSound(); // Play the click sound
    updateScore();
    checkRank();
    updateRank();
    saveUserData();
  } else {
    alert("Please log in first!");
  }
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

function handleLogin() {
  const username = prompt("Enter your username:");
  const password = prompt("Enter your password:");

  if (username !== null && username !== "" && password !== null && password !== "") {
    if (authenticateUser(username, password)) {
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      alert("Login successful! Welcome, " + currentUser + "!");
      loadUserData();
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  } else {
    alert("Login canceled. Please enter a valid username and password.");
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  alert("Logout successful!");
}

function handleSignUp() {
  const username = prompt("Enter a new username:");
  const password = prompt("Enter a password for your new account:");

  if (username !== null && username !== "" && password !== null && password !== "") {
    if (isUsernameUnique(username)) {
      userAccounts.push({ username, password, score: 0 });
      saveUserAccounts();
      alert("Account created successfully! Welcome, " + username + "!");
      authenticateAndLogin(username, password);
    } else {
      alert("Username already exists. Please choose a different username.");
    }
  } else {
    alert("Account creation canceled. Please enter a valid username and password.");
  }
}

function authenticateAndLogin(username, password) {
  currentUser = username;
  localStorage.setItem("currentUser", currentUser);
  
  loadUserData();
}

function loadUserData() {
  score = parseInt(localStorage.getItem("score")) || 0;
  updateScore();
  checkRank();
  updateRank();
}

function isUsernameUnique(username) {
  return !userAccounts.some(user => user.username === username);
}

function saveUserAccounts() {
  localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
}

// Event listeners
document.getElementById('clickButton').addEventListener('click', handleClick);
document.getElementById('loginButton').addEventListener('click', handleLogin);
document.getElementById('logoutButton').addEventListener('click', handleLogout);
document.getElementById('signUpButton').addEventListener('click', handleSignUp);
