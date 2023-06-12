function initiateRequest() {
    fetch('https://reqres.in/api/users/2')
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then(person => {
        const avatarImg = document.getElementById('avatar-img');
        avatarImg.src = person.data.avatar;
      })
      .catch(error => {
        console.error('Error:', error.message);
        const avatarImg = document.getElementById('avatar-img');
        avatarImg.alt = 'Avatar (Failed to load)';
      });
  }
  
  function fetchUserInfo() {
    fetch('https://reqres.in/api/users/2')
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then(person => {
  
        document.getElementById('firstName').value= person.data.first_name;
        document.getElementById('secondName').value = person.data.last_name;
        document.getElementById('email').value = person.data.email;
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }
  function fetchAvatar() {
    initiateRequest();
    fetchUserInfo()
  }
  