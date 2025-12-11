// ==== Greeting ====
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();
if (hour < 12) greeting.textContent = "Good morning!";
else if (hour < 18) greeting.textContent = "Good afternoon!";
else greeting.textContent = "Good evening!";

// ==== Dark/Light Mode Toggle ====
const toggleBtn = document.getElementById("toggleModeBtn");
const body = document.body;
if (localStorage.getItem("theme") === "dark") body.classList.add("dark");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

// ==== Live Project Search ====
const searchInput = document.getElementById("searchInput");
const projectCards = document.querySelectorAll(".project-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  let match = 0;
  projectCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();
    if (title.includes(term) || desc.includes(term)) {
      card.style.display = "block";
      match++;
    } else {
      card.style.display = "none";
    }
  });
  noResults.classList.toggle("hidden", match !== 0);
});

// ==== Contact Form Validation ====
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    msg.textContent = "⚠️ Please fill in all fields!";
    msg.style.color = "red";
    return;
  }

  if (!email.includes("@") || !email.endsWith(".com")) {
    msg.textContent = "⚠️ Please enter a valid email address.";
    msg.style.color = "red";
    return;
  }

  msg.textContent = "✅ Message sent successfully!";
  msg.style.color = "green";
  form.reset();
  setTimeout(() => (msg.textContent = ""), 3000);
});

// ==== GitHub API Integration ====
const username = "NeefCS"; // your GitHub username
const repoContainer = document.getElementById("repoList");
const repoError = document.getElementById("repoError");

async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    if (!response.ok) throw new Error("Failed to fetch repos");
    const repos = await response.json();

    repoContainer.innerHTML = repos
      .map(
        (repo) => `
        <li class="repo-card">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        </li>`
      )
      .join("");
  } catch (error) {
    repoContainer.classList.add("hidden");
    repoError.classList.remove("hidden");
  }
}

fetchGitHubRepos();