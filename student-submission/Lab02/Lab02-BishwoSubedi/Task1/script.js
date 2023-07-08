const button = document.getElementById("btn");
const contentWrapper = document.getElementById("cont");

const Request = (url) => {
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

const UserInfo = (user) => {
  const content = document.createElement("div");
  content.classList.add("content");
  contentWrapper.appendChild(content);
  content.innerHTML += `
<h1>Name:${user.name}</h1>
<p> Address:${user.address.city}</p>
<p> Email:${user.email}</p>
<p>Phone no.: ${user.phone}</p>
`;
  button.removeEventListener("click", onClick);
};
const onClick = () => {
     Request("https://jsonplaceholder.typicode.com/users/")
    .then((response) => {
      return JSON.parse(response.responseText);
    })
    .then((data) => {
      data.forEach((element) => {
        UserInfo(element);
      });
    })
    .catch((error) => {
      contentWrapper.innerHTML = `
       <h1>${error}</h1>
  `;
    });
};

button.addEventListener("click", onClick);
