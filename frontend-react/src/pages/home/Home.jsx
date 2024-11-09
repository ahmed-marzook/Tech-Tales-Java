import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleItem from "../../components/article/ArticleItem";

const BASE_URL = "http://localhost:8080/api/v1/articles";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL);
        console.log(response.data.content);
        setArticleList(response.data.content);
      } catch (err) {
        console.log("Error fetching data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>All Articles</h1>
      <div className="article-list">
        {isLoading && <h1>LOADING...</h1>}
        {articleList.map((article) => (
          <ArticleItem
            key={article.key}
            id={article.id}
            title={article.title}
            author={article.authorFullName}
            publishingDate={article.publishingDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
