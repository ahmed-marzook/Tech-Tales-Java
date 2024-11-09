import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logoipsum-297.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Tech Tales Logo" />
      </div>
      <div className="nav-menu">
        <a href="/">Home</a>
        <a href="/authors">Authors</a>
        <a href="/article/create">Create Article</a>
      </div>
      <div className="search-bar">
        <div className="search">
          <input type="text" className="input" placeholder="Search..." />
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
