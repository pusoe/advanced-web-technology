document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
  
    const userInfo = {
      first_name: firstName,
      last_name: lastName,
      email: email
    };
  
    const jsonUserInfo = JSON.stringify(userInfo);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://reqres.in/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    const promise = new Promise(function(resolve, reject) {
      xhr.onload = function() {
        if (xhr.status === 201) {
          resolve('User information submitted successfully!');
        } else {
          reject('Failed to submit user information.');
        }
      };
  
      xhr.onerror = function() {
        reject('Network error occurred.');
      };
    });
  
    promise
      .then(function(successMessage) {
        alert(successMessage);
      })
      .catch(function(errorMessage) {
        alert(errorMessage);
      });
  
    xhr.send(jsonUserInfo);
  });
  