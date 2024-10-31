let currentPage = 0;
let maxPage;

async function changePage(pageNumber) {
    // Make the URL construction more readable
    const baseUrl = 'http://localhost:8080/api/v1/articles';
    const params = new URLSearchParams({
        page: pageNumber,
        size: 5
    });

    const articles = await getData(`${baseUrl}?${params}`);
    const articleListElem = document.querySelector('.article-list')

    maxPage = articles.page.totalPages - 1;

    articleListElem.innerHTML = ''
    articles.content.forEach(element => {
        articleListElem.append(createArticleElement(element.id, element.title, element.authorFullName, element.publishingDate));
    });
}

// Function to create and attach article element with event listener
function createArticleElement(id, title, authorFullName, publishingDate) {
    // Create the HTML string
    const articleHTML = `
        <div class="article-item" id="${id}">
            <h2 class="article-title">${title}</h2>
            <p class="article-author">${authorFullName}</p>
            <span class="article-date"><em>${publishingDate}</em></span>
        </div>
    `;

    // Convert HTML string to DOM element
    // Template approach - safer and more efficient
    const template = document.createElement('template');
    template.innerHTML = articleHTML.trim();
    const articleElement = template.content.firstElementChild;

    // Add event listener to the element
    articleElement.addEventListener('click', (event) => {
        handleArticleClick(id, title, event);
    });

    // Add hover effect listener
    articleElement.addEventListener('mouseenter', () => {
        articleElement.classList.add('article-hover');
    });

    articleElement.addEventListener('mouseleave', () => {
        articleElement.classList.remove('article-hover');
    });

    return articleElement;
}

// Handler function for article clicks
async function handleArticleClick(id, title, event) {
    const baseUrl = `http://localhost:8080/api/v1/articles/${id}`;
    const article = await getData(`${baseUrl}`);
    window.location.href = "./article.html";
    console.log(article)
}


changePage(currentPage);

document.querySelector(".pagination-next").addEventListener('click', () => {
    currentPage = Math.min(currentPage + 1, maxPage);
    changePage(currentPage)
});

document.querySelector(".pagination-prev").addEventListener('click', () => {
    currentPage = Math.max(currentPage - 1, 0);
    changePage(currentPage)
});

