import { RouteMenuList } from "../../Router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { withRouter } from "../../utils/router.js";

function SideMenu(props) {
  return (
    <Menu
      selectedKeys={props.selectedKeys}
      mode="horizontal"
      items={RouteMenuList.map((item) => {
        return {
          key: item.path,
          label: <NavLink to={item.path}>{item.name}</NavLink>,
        };
      })}
    ></Menu>
  );
}
export default withRouter(SideMenu);
