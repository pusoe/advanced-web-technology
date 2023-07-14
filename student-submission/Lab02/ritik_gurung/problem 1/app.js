const btn = document.querySelector("button");
const contentWrapper = document.querySelector(".container");

const makereq = (url) => {
    return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    console.log(req);
    req.open("GET", url);
    req.addEventListener("readystatechange", () => {
        if (req.readyState === 4 && req.status === 200) 
        {
        resolve(req);
        }
        if (req.status === 404) {
        reject("Unable to Fetch User Information");
    }
    });
    req.send();
});
};

const displayUserInfo = (user) => {
    const content = document.createElement("div");
    content.classList.add("content");
    contentWrapper.appendChild(content);
    content.innerHTML += `
    <h2>Name:${user.name}</h2>
    <p> Address:${user.address.city}</p>
    <p> Email:${user.email}</p>
    <p>Phone no.: ${user.phone}</p>
    `;
    btn.removeEventListener("click", onClick);
};
const onClick = () => {
    makereq("https://jsonplaceholder.typicode.com/users/")
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
        <h2>${error}</h2>
        `;
    });
};

btn.addEventListener("click", onClick);
