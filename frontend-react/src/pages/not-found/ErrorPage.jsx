import "./ErrorPage.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NotFound(props) {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-code">{props.errorCode}</div>
        <h1>{props.title}</h1>
        <p>{props.message}</p>
        <div className="illustration">
          <div className="circle"></div>
          <div className="search-icon">
            <div className="magnifier"></div>
            <div className="handle"></div>
          </div>
        </div>
        <div className="actions">
          <Link to="/" className="home-button">
            Return to Home
          </Link>
          <button onClick={() => window.history.back()} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  errorCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
