import { AIEditorPage } from "./pages/ai-editor";
import { CaboEntryPage } from "./pages/cabo";
import { CaboScoreBoardPage } from "./pages/cabo/score-board";
import { ArticleList } from "./pages/article-list";

export const RouteMenuList = [
  {
    key: "home",
    name: "📚 Home",
    path: "/",
    component: <ArticleList></ArticleList>,
  },
  {
    key: "cabo",
    name: "🦄 Cabo",
    path: "/cabo",
    component: <CaboEntryPage />,
  },
  {
    key: "ai-editor",
    name: "🤖 AI Editor",
    path: "/ai-editor",
    component: <AIEditorPage />,
  },
];

export const RouterPageList = [
  ...RouteMenuList,
  {
    key: "cabo",
    name: "🦄 Cabo",
    path: "/cabo/board",
    component: <CaboScoreBoardPage />,
  },
];
