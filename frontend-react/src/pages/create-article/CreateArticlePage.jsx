import "./CreateArticlePage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthorApi from "../../apis/authors/useFetchAuthorEffect";
import API_CONFIG from "../../apis/configs/axiosConfig";

function CreateArticlePage() {
  const { articleId } = useParams();
  const [error, setError] = useState(null); // Stores any API errors
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const { authorList } = useAuthorApi();

  const navigate = useNavigate();
  const isUpdateMode = Boolean(articleId);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "",
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!isUpdateMode) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_CONFIG.ENDPOINTS.ARTICLES}/${articleId}`
        );
        const article = response.data;

        setFormData({
          title: article.title,
          content: article.content,
          authorId: article.authorId?.toString() || "",
        });
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to fetch article data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, isUpdateMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        authorId: parseInt(formData.authorId, 10),
      };

      let response;
      if (isUpdateMode) {
        response = await axios.put(
          API_CONFIG.ENDPOINTS.ARTICLES,
          {
            ...payload,
            id: parseInt(articleId, 10), // Include article ID in PUT request
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        response = await axios.post(API_CONFIG.ENDPOINTS.ARTICLES, payload, {
          headers: { "Content-Type": "application/json" },
        });
      }

      console.log(
        `Article ${isUpdateMode ? "updated" : "created"} successfully:`,
        response.data
      );

      // Navigate to article page after success
      navigate(`/article/${isUpdateMode ? articleId : response.data}`);
    } catch (err) {
      console.error(
        `Error ${isUpdateMode ? "updating" : "creating"} article:`,
        err
      );
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `An error occurred while ${
          isUpdateMode ? "updating" : "creating"
        } the article`;
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
            readOnly={isUpdateMode}
            disabled={isUpdateMode}
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
