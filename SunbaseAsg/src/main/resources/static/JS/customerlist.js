// Toggle dropdown menu visibility
document.querySelector('.btn-dropdown').addEventListener('click', function() {
    var menu = document.getElementById('searchFieldMenu');
    menu.classList.toggle('show');
});

// Hide dropdown menu when clicking outside
window.addEventListener('click', function(event) {
    var dropdownButton = document.querySelector('.btn-dropdown');
    var menu = document.getElementById('searchFieldMenu');
    
    if (!dropdownButton.contains(event.target) && !menu.contains(event.target)) {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
});

// Update dropdown button text and store selected field
document.addEventListener('DOMContentLoaded', function () {
    var dropdownButton = document.querySelector('.btn-dropdown');
    var dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    
    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Update button text
            dropdownButton.childNodes[0].textContent = this.textContent;
            
            // Store selected field (optional usage)
            var selectedField = this.getAttribute('data-field');
            console.log('Selected field:', selectedField);

            // Close the dropdown menu after selection
            var menu = document.getElementById('searchFieldMenu');
            menu.classList.remove('show');
        });
    });
});

function redirectToAddCustomer() {
    window.location.href = '/add_customer';
}
document.addEventListener('DOMContentLoaded', function() {
    // Initial page number
    let pageNumber = 0;
    const pageSize = 10; // Number of items per page
    const sortBy = 'uuid'; // Sorting field
    const sortDirection = 'asc'; // Sorting direction

    function fetchCustomers() {
        fetch(`/api/all_customers?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = ''; // Clear existing rows

                data.content.forEach(customer => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${customer.first_name}</td>
                        <td>${customer.last_name}</td>
                        <td>${customer.street}</td>
                        <td>${customer.address}</td>
                        <td>${customer.city}</td>
                        <td>${customer.state}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>
                            <a href="/api/editCustomer/${customer.uuid}" class="btn btn-outline-primary btn-icon">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                            <a href="/api/deleteCustomer/${customer.uuid}" class="btn btn-outline-danger btn-icon">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });

                // Update pagination controls
                updatePagination(data.currentPage, data.totalPages);
            })
            .catch(error => console.error('Error fetching customers:', error));
    }

    function updatePagination(currentPage, totalPages) {
        const pageNumbers = document.getElementById('pageNumbers');
        pageNumbers.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const pageNumberElement = document.createElement('button');
            pageNumberElement.classList.add('pagination-button');
            pageNumberElement.innerText = i + 1;
            pageNumberElement.addEventListener('click', () => {
                pageNumber = i;
                fetchCustomers();
            });

            if (i === currentPage) {
                pageNumberElement.disabled = true;
            }

            pageNumbers.appendChild(pageNumberElement);
        }
    }

    // Fetch initial data
    fetchCustomers();
});


document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('syncButton').addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default button click behavior

                fetch('/api/sync_customers', {
                    method: 'POST'
                })
                .then(response => response.text())
                .then(data => {
                    alert(data); // Show success or error message
                    window.location.reload(); // Reload the page to show updated data
                })
                .catch(error => console.error('Error:', error));
            });
});

let selectedField = 'firstName'; // Default search field

// Add event listeners to dropdown items
document.querySelectorAll('#searchFieldMenu .dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        selectedField = this.getAttribute('data-field');
        console.log('Selected field:', selectedField); // Debugging

        // Update dropdown button text to show selected field
        document.querySelector('.btn-dropdown').innerHTML = `Search By: ${this.innerText} <i id="dropdownButton" class="fas fa-chevron-down dropdown-icon"></i>`;
    });
});

// Perform search on button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchValue = document.getElementById('searchValue').value;
    console.log('Search value:', searchValue); // Debugging

    fetch(`/api/search_customers?field=${selectedField}&value=${encodeURIComponent(searchValue)}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(customer => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${customer.first_name}</td>
                    <td>${customer.last_name}</td>
                    <td>${customer.street}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <a href="/api/editCustomer/${customer.uuid}" class="btn btn-outline-primary btn-icon">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="/api/deleteCustomer/${customer.uuid}" class="btn btn-outline-danger btn-icon">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching customers:', error));
});



document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPage = 10;
    let currentPage = 1;
    const tableBody = document.getElementById('tableBody');
    const pageNumbersContainer = document.getElementById('pageNumbers');
    
    // Example data; replace with actual data
    const data = [
        /* Your data objects here */
    ];

    function renderTable(data, page) {
        tableBody.innerHTML = '';
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);
        
        paginatedData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.street}</td>
                <td>${item.address}</td>
                <td>${item.city}</td>
                <td>${item.state}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>
                    <a style="color:blue" href="/editCustomer/${item.id}">Edit</a>
                    <a style="color:red" href="/deleteCustomer/${item.id}">Delete</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function renderPagination(data) {
        pageNumbersContainer.innerHTML = '';
        const totalPages = Math.ceil(data.length / rowsPerPage);
        
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.textContent = i;
            pageNumber.className = 'page-number';
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', function () {
                currentPage = i;
                renderTable(data, currentPage);
                renderPagination(data);
            });
            pageNumbersContainer.appendChild(pageNumber);
        }
    }

    function handlePagination() {
        document.getElementById('prevPage').addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                renderTable(data, currentPage);
                renderPagination(data);
            }
        });
        document.getElementById('nextPage').addEventListener('click', function () {
            const totalPages = Math.ceil(data.length / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(data, currentPage);
                renderPagination(data);
            }
        });
    }

    renderTable(data, currentPage);
    renderPagination(data);
    handlePagination();
});

function deleteCustomer(customerId) {
    // Perform delete operation or assume it's handled elsewhere
    // Redirect directly to the /customers page
    window.location.href = '/customers';
}


document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = '/home';
});