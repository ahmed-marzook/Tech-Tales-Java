import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ErrorPage from "../not-found/ErrorPage";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../../apis/configs/axiosConfig";

function ArticlePage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState("LOADING");
  const { articleId } = useParams();
  const navigate = useNavigate();

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        const response = await axios.get(
          `${API_CONFIG.ENDPOINTS.ARTICLES}/${articleId}`,
          {
            signal: abortControllerRef.current.signal,
          }
        );
        setArticle(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request aborted:", err.message);
          return;
        }
        setError(err.response?.data?.message || "Failed to fetch article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [articleId]);

  async function handleDeleteArticle() {
    try {
      const response = await axios.delete(
        `${API_CONFIG.ENDPOINTS.ARTICLES}/${articleId}`
      );

      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      // Handle error appropriately - maybe show an error message to user
    }
  }

  if (error) {
    return (
      <ErrorPage
        title="Error Loading Data"
        message={`Error fetching data: ${error.message}`}
        errorCode="500"
      />
    );
  }

  return (
    <div className="article-container">
      {isLoading ? (
        <div className="loading">
          <h1>LOADING...</h1>
        </div>
      ) : (
        <article>
          <header className="article-header">
            <div className="article-title">
              <h1>{article.title}</h1>
              <button onClick={handleDeleteArticle} className="btn">
                Delete
              </button>
              <button
                className="btn"
                onClick={() => navigate(`/article/editor/${articleId}`)}
              >
                Update
              </button>
            </div>
            <div className="article-metadata">
              <div className="metadata-item">
                <span className="metadata-label">Published:</span>
                <time>
                  {new Date(article.publishingDate).toLocaleDateString(
                    "en-UK",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Last Updated:</span>
                <time>
                  {new Date(article.updatedAt).toLocaleDateString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </header>

          <div className="article-content">{article.content}</div>

          <footer className="article-footer">
            <div className="author-info">
              {article.authorFirstName && article.authorLastName
                ? `By: ${article.authorFirstName} ${article.authorLastName}`
                : "By: Unknown"}
            </div>
          </footer>
        </article>
      )}
    </div>
  );
}

export default ArticlePage;
