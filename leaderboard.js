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
  const leaderboard = getLeaderboard();
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard.splice(10);
  setCookie("leaderboard", JSON.stringify(leaderboard), 365);
  displayLeaderboard();
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
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