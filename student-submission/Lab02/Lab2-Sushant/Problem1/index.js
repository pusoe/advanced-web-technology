function fetchUserInfo() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = "https://jsonplaceholder.typicode.com/users/1";

    xhr.open("GET", url, true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject("Error: " + xhr.status);
      }
    };

    xhr.onerror = function() {
      reject("Request failed");
    };

    xhr.send();
  });
}

const displayUserInfo=(user)=> {
  var userInfoContainer = document.getElementById("user-info");
  var html = `
    <h2>${user.name}</h2>
    <p>Email: ${user.email}</p>
    <p>City: ${user.address.city}</p>
  `;
  userInfoContainer.innerHTML = html;
}

fetchUserInfo()
  .then(function(user) {
    displayUserInfo(user);
  })
  .catch(function(error) {
    var userInfoContainer = document.getElementById("user-info");
    userInfoContainer.innerHTML = "<p>Error: " + error + "</p>";
  });
