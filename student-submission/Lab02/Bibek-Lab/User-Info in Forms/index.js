let api = `https://reqres.in/api/users/`;

let fullData = getAllData();

function getAllData() {
  let arr = [];
  for (let index = 1; index < 11; index++) {
    arr.push({
      id: index,
      img: ``,
      name: ``,
      email: "",
    });
  }
  return arr;
}

console.log("fullData", fullData);

function render() {
  let html = fullData.map((each) => {
    return `
    <div class="each-user">
        <h1>User Info</h1>
        <div>
            <label for="">Name:</label>
            <input type="text" id="name" value=${each.name}>
        </div>
        <div>
            <label for="">Email</label>
            <input type="email" id="email" value="${each.email}"/>
          </div>
          <div class="big-image-container">
            <div class="image-container">
              <img src="${each.img}" alt="just a photo" />
            </div>
          </div>
        <button id="${each.id}" data-fetch=${each.id} autocomplete="no">Fetch Data</button>
    </div>
    `;
  });
  document.getElementById("container").innerHTML = html;
}

document.addEventListener("click", function (e) {
  console.log("clicked", e.target.id);
  if (e.target.id) {
    fetch(`https://reqres.in/api/users/` + e.target.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bhitra", data);
        let newData = data.data;
        let newArr = fullData.map((each) => {
          console.log("id", each.id);
          if (`${each.id}` === e.target.id) {
            console.log("entered");
            let fullName = newData.first_name + " " + newData.last_name;
            console.log("fullname", fullName);
            return {
              id: e.target.id,
              name: fullName,
              email: newData.email,
              img: newData.avatar,
            };
          } else {
            console.log("not entered");
            return each;
          }
        });
        fullData = newArr;
        render();
      });
  }
});

render();

async function fullHtml() {
  let html = ``;
  for (let index = 1; index < 11; index++) {
    html += await eachUser(index);
  }
  render(html);
}
