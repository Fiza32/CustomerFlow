// Retrieve token from localStorage and display it
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        document.getElementById('tokenDisplay').value = token;
    }
});


// Copy token to clipboard
document.getElementById('copyTokenButton').addEventListener('click', function() {
    const tokenInput = document.getElementById('tokenDisplay');
    tokenInput.select();
    tokenInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Token copied to clipboard');
});


// Verify token
document.getElementById('verifyTokenButton').addEventListener('click', function() {
    const token = document.getElementById('tokenInput').value;
    // Add your token verification logic here
    console.log('Token to verify:', token);
});


// Verify token
document.getElementById('verifyTokenButton').addEventListener('click', function() {
    const token = document.getElementById('tokenInput').value;
    
    // Make a request to the backend to verify the token
    fetch('/users/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => {
        if (response.ok) {
            // Token is valid, redirect to customer list page
            window.location.href = '/customers';
        } else {
            // Handle invalid token
            alert('Invalid token. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});