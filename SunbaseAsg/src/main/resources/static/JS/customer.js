function saveCustomer(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const customer = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        street: document.getElementById('street').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
	
	console.log('Customer to be saved:', customer); // Debugging

    fetch('/api/save_customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to save customer');
        }
    })
    .then(data => {
        alert('Customer saved successfully');
        window.location.href = '/customers'; // Redirect to customer list page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error during saving customer');
    });
}

document.querySelector('form').addEventListener('submit', saveCustomer);
