const fetchPersonInformation = () => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', 'https://jsonplaceholder.typicode.com/users/1', true);
        req.responseText='Error';
        req.onload = () => {
            if (req.status === 200) {
                resolve(JSON.parse(req.responseText));
            }
        }
        req.send();
    });
};
const displayError = (errorMessage) => {
    document.getElementById('Unable To Show').textContent = errorMessage;
}

const displayUserInfo = (person) => {
    document.getElementById('name').textContent = person.name;
    document.getElementById('email').textContent = person.email;
    document.getElementById('city').textContent = person.address.city;
};

const fetchData = () => {
    fetchPersonInformation()
        .then((person) => {
            displayUserInfo(person);
        })
        .catch((error) => {
            console.error('Error:', error);
            displayError(error);
        });
};