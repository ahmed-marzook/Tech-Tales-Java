const articleContainer = document.querySelector(".container")

async function loadArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const baseUrl = `http://localhost:8080/api/v1/articles/${id}`;
    const article = await getData(`${baseUrl}`);
    const articleTemplate = `
    <h1 class="article-title">
      ${article.title}
    </h1>
    <hr />
    <div class="article-content">
      ${article.content}
        <hr />
        <span>${article.authorFullName}. ${article.publishingDate}</span>
    </div>
`

    articleContainer.innerHTML = ''
    articleContainer.innerHTML += (articleTemplate)
}

document.addEventListener('DOMContentLoaded', loadArticle);