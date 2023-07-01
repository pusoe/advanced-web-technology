let api = "https://jsonplaceholder.typicode.com/users";
let extraApi = `https://reqes.in/api/users/2`;

document.getElementById("btn").addEventListener("click", function () {
  try {
    fetch(`${api}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let html = DisplayUserInfo(data);

        document.getElementById("container").innerHTML = html;
      });
  } catch (error) {
    document.getElementById("container").innerHTML = `<p>Error Occured</p>`;
  }
});

function DisplayUserInfo(data) {
  let html = data
    .map((each) => {
      return `<div class="each-user">
            <h2>User Information</h2>
            <h3>Name: ${each.name}</h3>
            <p>Email: ${each.email}</p>
            <p>City: ${each.address.city}</p>
            </div>`;
    })
    .join("");
  return html;
}
