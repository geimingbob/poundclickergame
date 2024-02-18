let score = parseInt(localStorage.getItem("score")) || 0;
let rank = localStorage.getItem("rank") || "Beginner";
let currentUser = localStorage.getItem("currentUser") || null;

// Load user accounts from local storage or initialize an empty array
let userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

// Function to authenticate user
function authenticateUser(username, password) {
  const existingUser = userAccounts.find(user => user.username === username);

  if (existingUser) {
    // Compare the entered password with the stored password
    if (existingUser.password === password) {
      return true; // Authentication successful
    } else {
      return false; // Incorrect password
    }
  } else {
    return false; // User not found
  }
}

function handleClick() {
  if (currentUser !== null) {
    score++;
    updateScore();
    checkRank();
    updateRank();
    saveUserData();
    updateLeaderboard();
  } else {
    alert("Please log in first!");
  }
}

function updateScore() {
  document.getElementById('score').textContent = 'Score: ' + score;
}

function checkRank() {
  const rankThresholds = [10, 50, 100, 200];
  const rankNames = ["Beginner", "Intermediate", "Advanced", "Master"];

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
      userAccounts.push({ username, password, score: 0 }); // Initialize score to 0
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

// ... (your existing code)

function loadUserData() {
  score = parseInt(localStorage.getItem("score")) || 0;
  updateScore();
  checkRank();
  updateRank();
  updateLeaderboard();
}

// Check if there is a logged-in user on page load
window.addEventListener('load', function() {
  if (currentUser !== null) {
    alert("Welcome back, " + currentUser + "!");
    loadUserData(); // Make sure to load user data on page load
  }
});

document.getElementById('clickButton').addEventListener('click', handleClick);
document.getElementById('loginButton').addEventListener('click', handleLogin);
document.getElementById('logoutButton').addEventListener('click', handleLogout);
document.getElementById('signUpButton').addEventListener('click', handleSignUp);

// Add this event listener for loading user data if someone accesses the leaderboard directly
document.getElementById('leaderboard').addEventListener('click', function() {
  loadUserData();
});
