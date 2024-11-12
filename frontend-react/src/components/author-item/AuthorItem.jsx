import PropTypes from "prop-types";
import "./AuthorItem.css";
import { useNavigate } from "react-router-dom";

AuthorItem.propTypes = {};

function AuthorItem(props) {
  const navigate = useNavigate();

  function handleAuthorClick() {
    navigate(`/articles/author/${props.id}`);
  }

  return (
    <div className="author-item" onClick={handleAuthorClick}>
      <img
        src={`https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 100
        )}.jpg`}
        alt="Avatar"
      />
      <p>
        <span>
          {props.firstName} {props.lastName}
        </span>{" "}
        {props.email}
      </p>
      <p>{props.bio}</p>
    </div>
  );
}

AuthorItem.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default AuthorItem;
