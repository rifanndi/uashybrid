// ArticleDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import DetailArticle from "./DetailArticle.tsx";

const ArticleDetailPage = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find((article) => article._id === id);

  return (
    <div style={{ textAlign: "center", marginBottom: "10%" }}>
      {article ? (
        <DetailArticle article={article} />
      ) : (
        <p>Article not found.</p>
      )}
    </div>
  );
};

export default ArticleDetailPage;
