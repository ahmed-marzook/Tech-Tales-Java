import "./Author.css";

function Author() {
  return (
    <div className="container">
      <h1>All Authors</h1>
      <div className="author-list">
        <div className="author-item">
          <img
            src="https://randomuser.me/api/portraits/men/${num}.jpg"
            alt="Avatar"
            style="width: 90px"
          />
          <p>
            <span>First Name Last Name</span> Email
          </p>
          <p>Bio</p>
        </div>
      </div>
    </div>
  );
}

export default Author;
