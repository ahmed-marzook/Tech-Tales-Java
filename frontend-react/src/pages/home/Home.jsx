// Import required styles and dependencies
import "./Home.css";
import { useState, useEffect, useRef } from "react"; // React hooks for state and lifecycle management
import axios from "axios"; // HTTP client for making API requests
import ArticleItem from "../../components/article/ArticleItem"; // Component to render individual articles
import ErrorPage from "../not-found/ErrorPage"; // Error page component for handling errors

// Base URL for the articles API endpoint
const BASE_URL = "http://localhost:8080/api/v1/articles";

function Home() {
  // State Management
  const [error, setError] = useState(null); // Stores any API errors
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [articleList, setArticleList] = useState([]); // Stores the list of articles
  const [page, setPage] = useState(0); // Current page number (0-based)
  const [maxPage, setMaxPage] = useState(0); // Maximum available pages

  // Ref to store the AbortController for canceling ongoing requests
  const abortControllerRef = useRef(null);

  // Effect hook to fetch articles when page changes
  useEffect(() => {
    const fetchData = async () => {
      // Cancel any ongoing requests before making a new one
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new AbortController for the current request
      abortControllerRef.current = new AbortController();

      try {
        setIsLoading(true);
        // Make GET request to fetch articles with pagination
        const response = await axios.get(BASE_URL, {
          params: {
            page: page, // Current page number
            size: 8, // Number of articles per page
          },
          signal: abortControllerRef.current.signal, // Signal for request cancellation
        });

        // Update state with API response
        setMaxPage(response.data.page.totalPages);
        setArticleList(response.data.content);
      } catch (err) {
        // Handle request cancellation separately from other errors
        if (axios.isCancel(err)) {
          console.log("Request aborted:", err.message);
          return;
        }
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort any ongoing requests when component unmounts
    // or when page changes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]); // Re-run effect when page changes

  // Display error page if there's an error
  if (error) {
    return (
      <ErrorPage
        title="Error Loading Data"
        message={`Error fetching data: ${error.message}`}
        errorCode="500"
      />
    );
  }

  // Pagination handlers
  function incrementPage() {
    setPage((currentPage) => {
      return Math.min(currentPage + 1, maxPage); // Prevent exceeding max page
    });
  }

  function decrementPage() {
    setPage((currentPage) => {
      return Math.max(currentPage - 1, 0); // Prevent negative page numbers
    });
  }

  // Component render
  return (
    <div className="container">
      <h1>All Articles</h1>
      {/* Show loading state */}
      {isLoading && <h1>LOADING...</h1>}

      {/* Show article list when not loading */}
      {!isLoading && (
        <div className="article-list">
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
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button className="pagination-prev" onClick={decrementPage}>
          &laquo; {/* Left arrow */}
        </button>
        <h1>{page + 1}</h1> {/* Display 1-based page number */}
        <button className="pagination-next" onClick={incrementPage}>
          &raquo; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
}

export default Home;
