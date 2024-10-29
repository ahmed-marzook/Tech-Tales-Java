// Generic fetch request function with error handling
async function fetchRequest(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // For DELETE requests, we might not have any content to parse
        if (method === 'DELETE') {
            return { status: response.status, statusText: response.statusText };
        }

        return await response.json();
    } catch (error) {
        console.error(`Error during ${method} request:`, error);
        throw error;
    }
}

// GET request
async function getData(url, params = {}) {
    // Handle query parameters
    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = queryString ? `${url}?${queryString}` : url;

    return fetchRequest(urlWithParams, 'GET');
}

// POST request
async function postData(url, data) {
    return fetchRequest(url, 'POST', data);
}

// PUT request
async function putData(url, data) {
    return fetchRequest(url, 'PUT', data);
}

// DELETE request
async function deleteData(url) {
    return fetchRequest(url, 'DELETE');
}

async function fetchAllAuthors() {
    const authors = await getData('http://localhost:8080/api/v1/author');
    const authorListElem = document.querySelector('.author-list')

    console.log(authors)

    authorListElem.innerHTML = ''

    authors.forEach(element => {

        const num = Math.floor(Math.random() * 100);

        authorListElem.innerHTML += `
        <div class="author-item">
          <img
            src="https://randomuser.me/api/portraits/men/${num}.jpg"
            alt="Avatar"
            style="width: 90px"
          />
          <p><span>${element.firstName} ${element.lastName}.</span> ${element.email}</p>
          <p>${element.bio}</p>
        </div>
        `
    });
}

fetchAllAuthors()