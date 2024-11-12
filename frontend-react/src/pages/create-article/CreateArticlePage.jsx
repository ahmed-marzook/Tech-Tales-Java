import "./CreateArticlePage.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/author";

function CreateArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "",
  });
  const [error, setError] = useState(null); // Stores any API errors
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [authorList, setAuthorList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state
    setIsLoading(true);
    // Clear any previous errors
    setError(null);

    try {
      const payload = {
        ...formData,
        authorId: parseInt(formData.authorId, 10),
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/articles",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Article created successfully:", response.data);

      // Reset form after successful submission
      setFormData({
        title: "",
        content: "",
        authorId: "",
      });
    } catch (err) {
      console.error("Error creating article:", err);
      // Axios provides error.response for API errors
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while creating the article";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetching All Authors
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

  // end

  return (
    <div className="article-container">
      <div className="article-header">
        <h1 className="create-article-title">Create New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter article title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content*
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="form-textarea"
            placeholder="Write your article content here"
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorId" className="form-label">
            Author
          </label>
          <select
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select an author</option>
            {authorList.map((author) => (
              <option key={author.id} value={author.id}>
                {`${author.firstName} ${author.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Create Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticlePage;
