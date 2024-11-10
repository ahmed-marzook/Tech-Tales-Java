import "./CreateArticlePage.css";
import { useState } from "react";

function CreateArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      authorId: parseInt(formData.authorId, 10),
    };
    console.log("Form submitted:", payload);
    // Here you would typically make an API call to save the article
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="article-container">
      <div className="article-header">
        <h1 className="create-article-title">Create New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
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
            Content
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
            Author ID
          </label>
          <input
            type="number"
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter author ID"
          />
        </div>

        <button type="submit" className="submit-button">
          Create Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticlePage;
