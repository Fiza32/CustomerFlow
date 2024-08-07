function sign_up() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a user object to send to the backend
    const user = {
        email: email,
        password: password
    };

    fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to register user');
        }
    })
    .then(data => {
        // Handle success (e.g., redirect to login page or show success message)
        alert('Registration successful');
        window.location.href = '/login'; // Redirect to login page after successful registration
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error during registration');
    });
}

function returnHome() {
    window.location.href = '/home';
}
