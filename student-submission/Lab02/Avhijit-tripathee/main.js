const btn = document.querySelector("button");
const contentWrapper = document.querySelector(".container");
const url = "https://jsonplaceholder.typicode.com/users/";
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
  <div class="things">
    <p>Name:${user.name}</p>
    <p> Address:${user.address.city}</p>
    <p> Email:${user.email}</p>
    <p>Phone no.: ${user.phone}</p>
    </div>
    `;
  btn.removeEventListener("click", onClick);
};
const onClick = () => {
  makeRequest(url)
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
