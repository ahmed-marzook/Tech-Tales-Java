import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleItem from "../../components/article/ArticleItem";
import ErrorPage from "../not-found/ErrorPage";

const BASE_URL = "http://localhost:8080/api/v1/articles";

function Home() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL, {
          params: {
            page: page,
            size: 5,
          },
        });
        setMaxPage(response.data.page.totalPages);
        setArticleList(response.data.content);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (error) {
    return (
      <ErrorPage
        title="Error Loading Data"
        message={`Error fetching data: ${error.message}`}
        errorCode="500"
      />
    );
  }

  function incrementPage() {
    setPage((currentPage) => {
      return Math.min(currentPage + 1, maxPage);
    });
  }

  function decrementPage() {
    setPage((currentPage) => {
      return Math.max(currentPage - 1, 0);
    });
  }

  return (
    <div className="container">
      <h1>All Articles</h1>
      <div className="article-list">
        {isLoading && <h1>LOADING...</h1>}
        {articleList.map((article) => (
          <ArticleItem
            key={article.id}
            id={article.id}
            title={article.title}
            author={article.authorFullName}
            publishingDate={article.publishingDate}
          />
        ))}
      </div>
      <div className="pagination">
        <button className="pagination-prev" onClick={decrementPage}>
          &laquo;
        </button>
        <h1>{page}</h1>
        <button className="pagination-next" onClick={incrementPage}>
          &raquo;
        </button>
      </div>
    </div>
  );
}

export default Home;
