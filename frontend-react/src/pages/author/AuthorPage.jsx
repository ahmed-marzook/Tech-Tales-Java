import "./AuthorPage.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AuthorItem from "../../components/author-item/AuthorItem";

const BASE_URL = "http://localhost:8080/api/v1/author";

export default function AuthorPage() {
  const [error, setError] = useState(null); // Stores any API errors
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [authorList, setAuthorList] = useState([]);

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
          signal: abortControllerRef.current.signal, // Signal for request cancellation
        });
        console.log(response);
        // Update state with API response
        setAuthorList(response.data);
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
  }, []);

  return (
    <div className="container">
      <h1>All Authors</h1>
      <div className="author-list">
        {authorList.map((authorItem) => (
          <AuthorItem
            key={authorItem.id}
            firstName={authorItem.firstName}
            lastName={authorItem.lastName}
            bio={authorItem.bio}
            email={authorItem.email}
          />
        ))}
      </div>
    </div>
  );
}
