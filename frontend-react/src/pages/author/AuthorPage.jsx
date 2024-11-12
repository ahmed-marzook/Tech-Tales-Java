import "./AuthorPage.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AuthorItem from "../../components/author-item/AuthorItem";
import ErrorPage from "../not-found/ErrorPage";

const BASE_URL = "http://localhost:8080/api/v1/author";

export default function AuthorPage() {
  const [error, setError] = useState(null); // Stores any API errors
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [authorList, setAuthorList] = useState([]);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL, {
          signal: abortControllerRef.current.signal,
        });
        console.log(response);
        setAuthorList(response.data);
      } catch (err) {
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

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
