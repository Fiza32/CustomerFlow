// login.js
document.getElementById('sign-in-button').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        console.log(data);
        if (data.jwtToken) {
            // Store token and redirect to the token page
            localStorage.setItem('jwtToken', data.jwtToken);
            window.location.href = '/token';
        } else {
            // Handle login error
            alert('Invalid credentials');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function returnHome() {
     window.location.href = '/home';
}