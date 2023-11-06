import { Image } from "antd";
import defaultImage from "../../../assets/default-cover.jpg";

export function ArticleCard({ article }) {
  return (
    <div className="flex h-36 bg-white items-center w-full rounded-xl hover:cursor-pointer shadow-xl overflow-hidden justify-between">
      <div className="flex flex-col h-full mr-2 p-2">
        <text className="font-bold mb-3 line-clamp-2">{article.title}</text>
        <text className="line-clamp-3">{article.desc}</text>
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
