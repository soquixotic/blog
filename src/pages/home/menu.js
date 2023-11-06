import { RouteMenuList, RouterPageList } from "../../Router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { withRouter } from "../../utils/router.js";

function TopMenu(props) {
  const selectedKey =
    RouterPageList.find((item) => item.path === props.selectedKeys[0])?.key ??
    "home";
  return (
    <Menu
      className="w-full flex justify-start"
      selectedKeys={[selectedKey]}
      mode="horizontal"
      items={RouteMenuList.map((item) => {
        return {
          key: item.key,
          label: <NavLink to={item.path}>{item.name}</NavLink>,
        };
      })}
    ></Menu>
  );
}
export default withRouter(TopMenu);
