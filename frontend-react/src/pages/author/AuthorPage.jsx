import "./AuthorPage.css";
import AuthorItem from "../../components/author-item/AuthorItem";
import ErrorPage from "../not-found/ErrorPage";
import useFetchAuthorEffect from "../../apis/authors/useFetchAuthorEffect";

export default function AuthorPage() {
  const { authorList, isLoading, error } = useFetchAuthorEffect();

  if (error) {
    return (
      <ErrorPage
        title="Error Loading Data"
        message={`Error fetching data: ${error.message}`}
        errorCode="500"
      />
    );
  }

  return (
    <div className="container">
      <h1>All Authors</h1>
      {isLoading && (
        <div className="loading-overlay">
          <h2>Loading Authors...</h2>
          {/* Optional: Add a loading spinner component here */}
        </div>
      )}
      <div className="author-list">
        {authorList.map((authorItem) => (
          <AuthorItem
            key={authorItem.id}
            firstName={authorItem.firstName}
            lastName={authorItem.lastName}
            bio={authorItem.bio}
            email={authorItem.email}
          />
        ))}
      </div>
    </div>
  );
}
