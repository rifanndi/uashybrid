// App.jsx
import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import NavBar from "./NavBar"; // Import the NavBar component
import DetailArticle from "./DetailArticle";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const searchArticles = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${config.NYTimesAPIKey}`
      );
      setArticles(response.data.response.docs);
      setSelectedArticle(null);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div>
      <NavBar
        query={query}
        setQuery={setQuery}
        searchArticles={searchArticles}
      />
      <div style={{ margin: "3%" }}>
        {/* Menampilkan artikel */}
        {articles.map((article) => (
          <div
            key={article._id}
            className="mb-4 p-4 border rounded"
            style={{ borderRadius: "10px", border: "solid", margin: "10px" }}
          >
            <h2 style={{ marginLeft: "1.5%" }}>{article.headline.main}</h2>
            <p style={{ marginLeft: "1.5%" }}>
              <strong>Penulis:</strong> {article.byline.original} |{" "}
              <strong>Tanggal Rilis:</strong> {article.pub_date}
            </p>
            <p style={{ marginLeft: "1.5%" }}>{article.snippet}</p>{" "}
            <a
              href={article.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-all rounded"
            >
              Read Full Article
            </a>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginBottom: "10%" }}>
        {/* Menampilkan artikel yang dipilih */}
        {selectedArticle && <DetailArticle article={selectedArticle} />}
      </div>
    </div>
  );
}

export default App;
