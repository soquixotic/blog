import { Component } from "react";

const AsyncArticleList = asyncComponent(() => import("./pages/article-list"));
const AsyncAIEditorPage = asyncComponent(() => import("./pages/ai-editor"));
const AsyncCaboEntryPage = asyncComponent(() => import("./pages/cabo"));
const AsyncCaboScoreBoardPage = asyncComponent(() =>
  import("./pages/cabo/score-board")
);

export const RouteMenuList = [
  {
    key: "home",
    name: "📚 Home",
    path: "/",
    component: <AsyncArticleList></AsyncArticleList>,
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
];

export const RouterPageList = [
  ...RouteMenuList,
  {
    key: "cabo",
    name: "🦄 Cabo",
    path: "/cabo/board",
    component: <AsyncCaboScoreBoardPage />,
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
