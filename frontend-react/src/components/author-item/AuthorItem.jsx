import PropTypes from "prop-types";
import "./AuthorItem.css";

AuthorItem.propTypes = {};

function AuthorItem(props) {
  return (
    <div className="author-item">
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default AuthorItem;
