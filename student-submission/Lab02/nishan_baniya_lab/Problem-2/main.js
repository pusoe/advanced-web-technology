const button = document.querySelector("#button");
const container = document.querySelector(".container");

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(request);
      }
      if (request.status === 404) {
        reject("Unable to Fetch User Information");
      }
    });
    request.send();
  });
};

button.addEventListener("click", () => {
  makeRequest("https://reqres.in/api/users/2")
    .then((response) => {
    
      return JSON.parse(response.responseText);

    })
    .then((data) => {
      document.getElementById("fname").value = data.data.first_name;
      document.getElementById("lname").value = data.data.last_name;
      document.getElementById("emailId").value = data.data.email;

      const avatar = document.querySelector(".avatar");
      const img = document.createElement("img");
      img.src = data.data.avatar;
      avatar.appendChild(img);

    })
    .catch((error) => {
      container.innerHTML = `<h1>Oopse!${error}</h1>`;
    });
});
