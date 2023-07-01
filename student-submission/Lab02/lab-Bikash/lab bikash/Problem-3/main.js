const btn = document.querySelector("button");
console.log("my request");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");

let makeRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    const myData = JSON.stringify({
      firstName: fname.value,
      lastName: lname.value,
      email: email.value,
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

btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  if (fname.value.length <= 0) {
    document.querySelector("#first-name").innerText = "please fill this field";
    fname.focus();
  } else if (lname.value.length <= 0) {
    document.querySelector("#last-name").innerText = "please fill this field";
    lname.focus();
  } else if (email.value.length <= 0) {
    document.querySelector("#mail").innerText = "please fill this field";
    email.focus();
  } else {
    document.querySelector(".error-message").innerText = "";
    makeRequest("https://reqres.in/api/users")
      .then((response) => {
        alert("Data sent Successfully");
        // return JSON.parse(response);
        console.log(response);
      })
      // .then((data) => console.log(data))
      .catch((err) => {
        alert(err);
      });
  }
});
