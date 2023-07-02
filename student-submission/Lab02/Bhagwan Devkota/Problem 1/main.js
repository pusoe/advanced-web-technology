function getUserInfo() {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Failed to fetch user information."));
      }
    };
    xhr.onerror = function() {
      reject(new Error("Network error."));
    };
    xhr.send();
  });
}

function displayUserInfo(users) {
  const userInfoContainer = document.getElementById("user-info");
  userInfoContainer.innerHTML = "";

  users.forEach(function(user) {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    const nameElement = document.createElement("h2");
    nameElement.textContent = user.name;

    const emailElement = document.createElement("p");
    emailElement.textContent = `Email: ${user.email}`;

    const cityElement = document.createElement("p");
    cityElement.textContent = `City: ${user.address.city}`;

    userCard.appendChild(nameElement);
    userCard.appendChild(emailElement);
    userCard.appendChild(cityElement);

    userInfoContainer.appendChild(userCard);
  });
}

const fetchButton = document.getElementById("fetch-button");
fetchButton.addEventListener("click", function() {
  fetchButton.disabled = true;
  getUserInfo()
    .then(function(users) {
      displayUserInfo(users);
    })
    .catch(function(error) {
      const userInfoContainer = document.getElementById("user-info");
      userInfoContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    })
    .finally(function() {
      fetchButton.disabled = false;
    });
});