
const btn = document.querySelector("button");
console.log("my request");
const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;


let makeRequest = (url) => {
  
  return new Promise((resolve, reject) => {
    const myData = JSON.stringify({
      firstName: fname,
      lastName: lname,
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
$("#myform").submit(function(e){
  e.preventDefault()
  {
      makeRequest("https://reqres.in/api/users")
.then((response) => {
if (!response.ok) {
  
  alert("Data sent Successfully");
  
}

console.log(response);
})

.catch((err) => {
alert(err);
})
}});
