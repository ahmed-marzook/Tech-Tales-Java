import "./ArticleItem.css";
import PropTypes from "prop-types";

function ArticleItem(props) {
  return (
    <div className="article-item" id={props.id}>
      <h2 className="article-title">{props.title}</h2>
      <p className="article-author">{props.author}</p>
      <span className="article-date">
        <em>{props.publishingDate}</em>
      </span>
    </div>
  );
}

ArticleItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publishingDate: PropTypes.string.isRequired,
};

export default ArticleItem;
