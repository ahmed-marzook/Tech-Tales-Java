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