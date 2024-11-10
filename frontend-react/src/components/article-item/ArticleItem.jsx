import "./ArticleItem.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ArticleItem({ id, title, author, publishingDate }) {
  return (
    <Link to={`/article/${id}`} className="article-link">
      <div className="article-item" id={id}>
        <h2 className="article-title-comp">{title}</h2>
        <p className="article-author">{author}</p>
        <span className="article-date">
          <em>{publishingDate}</em>
        </span>
      </div>
    </Link>
  );
}

ArticleItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publishingDate: PropTypes.string.isRequired,
};

export default ArticleItem;
