import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticle } from "./repo";
import MarkdownIt from "markdown-it";
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function ArticleDetailPage() {
  const [params] = useSearchParams();
  const articleId = params.get("id");
  const [article, setArticle] = useState({});

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

  return (
    <div className="flex flex-col p-4 bg-white bg-opacity-80">
      <div className="text-2xl font-bold mb-4">{article.title}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: mdParser.render(article.content ?? ""),
        }}
      />
    </div>
  );
}
