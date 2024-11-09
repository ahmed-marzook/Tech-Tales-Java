import React from "react";
import PropTypes from "prop-types";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <h1>All Articles</h1>
      <div className="article-list">
        <div className="article-item" id="${id}">
          <h2 className="article-title">title</h2>
          <p className="article-author">authorFullName</p>
          <span className="article-date">
            <em>publishingDate</em>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
