import { Component } from "react";

const AsyncArticleList = asyncComponent(() => import("./pages/article-list"));
const AsyncAIGen = asyncComponent(() => import("./pages/ai-gen"));
const AsyncAIEditorPage = asyncComponent(() => import("./pages/ai-editor"));
const AsyncCaboEntryPage = asyncComponent(() => import("./pages/cabo"));
const AsyncCaboScoreBoardPage = asyncComponent(() =>
  import("./pages/cabo/score-board")
);
const AsyncArticleDetailPage = asyncComponent(() =>
  import("./pages/article-detail")
);
const AsyncCashTrackPage = asyncComponent(() => import("./pages/cash-track"));

export const RouteMenuList = [
  {
    key: "home",
    name: "📚 Home",
    path: "/",
    component: <AsyncArticleList></AsyncArticleList>,
  },
  {
    key: "ai-gen",
    name: "🎨 AI Paint",
    path: "/ai-gen",
    component: <AsyncAIGen />,
  },
  {
    key: "cabo",
    name: "🦄 Cabo",
    path: "/cabo",
    component: <AsyncCaboEntryPage />,
  },
  {
    key: "ai-editor",
    name: "🤖 AI Editor",
    path: "/ai-editor",
    component: <AsyncAIEditorPage />,
  },
  {
    key: "cash-track",
    name: "💰Cash Tracker",
    path: "/cash-track",
    component: <AsyncCashTrackPage />,
  },
];

export const RouterPageList = [
  ...RouteMenuList,
  {
    key: "cabo",
    name: "🦄 Cabo",
    path: "/cabo/board",
    component: <AsyncCaboScoreBoardPage />,
  },
  {
    key: "home",
    name: "Home",
    path: "/article",
    component: <AsyncArticleDetailPage />,
  },
];


function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      importComponent().then((mod) => {
        this.setState({
          component: mod.default ? mod.default : mod,
        });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
