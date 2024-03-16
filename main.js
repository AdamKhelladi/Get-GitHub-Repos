let input = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.addEventListener("click", function () {
  getRepos(input.value);
});

function getRepos(githubName) {
  if (input.value === "") {
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${githubName}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        reposData.innerHTML = "";

        repos.forEach((repo) => {
          let mainDiv = document.createElement("div");
          mainDiv.textContent = repo.name;

          let url = document.createElement("a");
          url.textContent = "Visit";
          url.href = `https://github.com/${githubName}/${repo.name}`;
          url.setAttribute("target", "_blanck");
          // url.target = "_blanck";

          mainDiv.appendChild(url);

          let starsSpan = document.createElement("span");
          starsText = document.createTextNode(`Stars: ${repo.stargazers_count}`);
          starsSpan.appendChild(starsText);

          mainDiv.appendChild(starsSpan);

          mainDiv.className = "repo-box";

          reposData.appendChild(mainDiv);
        });
      });
  }
}