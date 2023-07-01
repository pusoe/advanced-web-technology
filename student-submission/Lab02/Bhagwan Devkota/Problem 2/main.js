// Function to make an XMLHttpRequest and fetch user information
function fetchUserInfo() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://reqres.in/api/users/2');
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText).data);
        } else {
          reject('Error: Unable to fetch user information');
        }
      };
      xhr.onerror = () => {
        reject('Error: Unable to fetch user information');
      };
      xhr.send();
    });
  }

  // Function to populate the form fields with user information
  function populateForm(user) {
    document.getElementById('name').value = user.first_name + ' ' + user.last_name;
    document.getElementById('email').value = user.email;
    document.getElementById('avatar').src = user.avatar;
  }

  // Function to initiate the request and populate the form fields
  function initiateRequest() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';

    fetchUserInfo()
      .then(user => {
        populateForm(user);
      })
      .catch(error => {
        errorMessageElement.textContent = error;
      });
  }

  // Attach submit event listener to the form
  const form = document.getElementById('user-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    initiateRequest();
  });