import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticle } from "./repo";
import MarkdownIt from "markdown-it";
import { timeFormat } from "../../utils/format";
import { getUserInfo } from "../../utils/user";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function ArticleDetailPage() {
  const [params] = useSearchParams();
  const articleId = params.get("id");
  const [article, setArticle] = useState({});
  const hasLoggedIn = getUserInfo().id !== undefined;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchArticle(articleId);
      console.log(result);
      if (result.code === 0) {
        setArticle(result.data.article);
      }
    };
    fetchData();
  }, [articleId]);

  const onEditClick = () => {
    navigate("/ai-editor?id=" + article.id);
  };
  if (article.id === undefined) {
    return <Spin />;
  }

  return (
    <div className="flex flex-col p-4 bg-white bg-opacity-90">
      <div className="text-2xl font-bold mb-4 mt-4">{article.title}</div>
      <div className="flex items-center">
        <div className="text-sm text-gray-500">
          {timeFormat(article.update_at)}
        </div>
        {hasLoggedIn && (
          <div className="flex text-sm text-gray-300 ml-2">
            <div>|</div>
            <div
              className="text-sm text-gray-500 ml-2 hover:cursor-pointer select-none"
              onClick={onEditClick}
            >
              Edit
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-200 rounded-lg p-4 text-gray-500 mt-4">
        {article.brief}
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: mdParser.render(article.content ?? ""),
        }}
      />
    </div>
  );
}
