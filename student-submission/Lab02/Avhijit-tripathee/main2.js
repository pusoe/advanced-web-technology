const btn = document.querySelector("button");
console.log("my request");

let makeRequest = (url) => {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;

  return new Promise((resolve, reject) => {
    const myData = JSON.stringify({
      firstName: first_name,
      lastName: last_name,
      email: email,
    });

    const request = new XMLHttpRequest();

    console.log(request);
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.addEventListener("readystatechange", () => {
      if (request.status === 201) {
        resolve(request);
      }
      if (request.status == 404) {
        reject("Unable to send data");
      }
    });
    request.send(myData);
  });
};

btn.addEventListener("click", () => {
  makeRequest("https://reqres.in/api/users")
    .then((response) => {
      if (!response.ok) {
        // console.log(response);
        alert("Data sent Successfully");
        // throw Error(response.statusText);
      }
      // return JSON.parse(response);
      console.log(response);
    })
    // .then((data) => console.log(data))
    .catch((err) => {
      alert(err);
    });
});
