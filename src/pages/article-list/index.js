import { List } from "antd";
import { ArticleCard } from "./article-card";

const data = [
  {
    title: "折腾个人服务器-配置Nginx和Docker",
    desc: "Docker的简单介绍 Docker是一种轻量级的虚拟化技术。而虚拟化技术，则是将硬件做出逻辑抽象，从而让一个物理机器可以运行多个系统环境。 而Docker Hub则像是一个应用商店，你可以在里面找...",
  },
  {
    title: "折腾个人服务器 – 解决外网访问难题",
    desc: "Intro 买了个nas后发现找资源什么也挺累，就一直放着吃灰。最近买了个智能插座，发现这不是...",
  },
];

export default function ArticleList() {
  return (
    <div
      className="w-full h-full flex justify-center min-h-screen bg-white bg-opacity-60 rounded-xl"
      style={{ maxWidth: "750px", minWidth: "360px" }}
    >
      <List
        header={<div className="text-2xl font-bold ml-4">最近文章</div>}
        dataSource={data}
        split={false}
        className="w-full"
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
