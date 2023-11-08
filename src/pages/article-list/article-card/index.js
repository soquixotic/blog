import { Image } from "antd";
import defaultImage from "../../../assets/default-cover.jpg";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function ArticleCard({ article }) {
  const navigate = useNavigate();

  const timestamp = article.update_at * 1000;
  const date = new Date(timestamp);

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  const onClickCard = useCallback(() => {
    navigate("/article?id=" + article.id);
  }, [article, navigate]);

  return (
    <div
      className="flex h-36 bg-white items-center w-full rounded-xl hover:cursor-pointer shadow-xl overflow-hidden justify-between"
      onClick={onClickCard}
    >
      <div className="flex flex-col h-full mr-2 p-2 justify-between">
        <div className="flex flex-col">
          <div className="font-bold mb-2 line-clamp-1 text-base">
            {article.title}
          </div>
          <div className="line-clamp-3 text-base mb-2">{article.brief}</div>
        </div>
        <div className="line-clamp-1 font-light text-sm">{formattedDate}</div>
      </div>
      <Image
        src={article.image ?? defaultImage}
        preview={false}
        wrapperClassName="w-36 h-36"
        className="aspect-square w-36 h-36"
        style={{ width: "144px" }}
      />
    </div>
  );
}
