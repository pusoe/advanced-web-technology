const btn = document.querySelector("button");
const contentWrapper = document.querySelector(".container");

document.getElementById("")

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    console.log(request);
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

const displayUserInfo = (user) => {
  const content = document.createElement("div");
  content.classList.add("content");
  contentWrapper.appendChild(content);
  content.innerHTML += `
  <div class="w3-container w3-center w3-animate-right">
    <h1 class="name">Name:${user.name}</h1>
    <p class="ptext" > Address:${user.address.city}</p>
    <p class="ptext"> Email:${user.email}</p>
    <p class="ptext">Phone no.: ${user.phone}</p>
    </div>
    `;
  btn.removeEventListener("click", onClick);
};
const onClick = () => {
  makeRequest("https://jsonplaceholder.typicode.com/users/")
    .then((response) => {
     
       return JSON.parse(response.responseText);

    })
    .then((data) => {
      data.forEach((element) => {
        displayUserInfo(element);
      });
    })
    .catch((error) => {
      contentWrapper.innerHTML = `
        <h1>${error}</h1>
        `;
    });
};

btn.addEventListener("click", onClick);
