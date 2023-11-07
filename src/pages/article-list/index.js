import { List } from "antd";
import { ArticleCard } from "./article-card";
import { useEffect, useState } from "react";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isFetching, setIsFetch] = useState(true);
  useEffect(() => {
    fetch("https://api.zymx.tech/article/list?page_size=10")
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.code === 0) {
          setArticles(resp.data.articles ?? []);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsFetch(false));
  }, []);

  return (
    <div
      className="w-full h-full flex justify-center min-h-screen"
      style={{ maxWidth: "750px", minWidth: "360px" }}
    >
      <List
        header={<div className="text-2xl font-bold ml-4">最近文章</div>}
        dataSource={articles}
        split={false}
        className="w-full min-h-screen"
        loading={isFetching}
        renderItem={(item) => (
          <List.Item
            style={{ paddingInline: "0px", padding: "8px" }}
            className="w-full"
          >
            <ArticleCard article={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
