// Display the leaderboard when the page loads
window.addEventListener('load', function() {
  displayLeaderboard();
});

function displayLeaderboard() {
  const leaderboard = getLeaderboard();

  let leaderboardHTML = "<h2>Leaderboard</h2><ul>";
  leaderboard.forEach(entry => {
    leaderboardHTML += `<li>${entry.name}: ${entry.score}</li>`;
  });
  leaderboardHTML += "</ul>";

  document.getElementById('leaderboard').innerHTML = leaderboardHTML;
}

function getLeaderboard() {
  const leaderboardCookie = getCookie("leaderboard");
  return leaderboardCookie ? JSON.parse(leaderboardCookie) : [];
}

function updateLeaderboard(name, score) {
  console.log("Updating leaderboard...");
  const leaderboard = getLeaderboard();
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard.splice(10);
  setCookie("leaderboard", JSON.stringify(leaderboard), 365);
  displayLeaderboard();
}

// Update the updateLeaderboard function for your user accounts
function updateLeaderboard() {
  const leaderboardDiv = document.getElementById('leaderboard');
  leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";

  userAccounts.sort((a, b) => b.score - a.score); // Sort users by score

  userAccounts.forEach(user => {
    const userEntry = document.createElement('p');
    userEntry.textContent = user.username + ": " + user.score;
    leaderboardDiv.appendChild(userEntry);
  });
}

// Add an event listener for the refresh leaderboard button
document.getElementById('refreshLeaderboardButton').addEventListener('click', function () {
  updateLeaderboard();
});
