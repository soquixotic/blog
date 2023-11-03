import { Flex, Layout } from "antd";
import { useEffect, useState } from "react";

import SideMenu from "./menu";
import { Main } from "./main";
import { withRouter } from "../../utils/router";
import { useLocation } from "react-router-dom";

const { Header, Content } = Layout;

function Homepage() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  return (
    <Flex className={`items-center h-full w-full`} vertical>
      <Layout style={{ minHeight: "100vh" }} className="w-full">
        <Header style={{ backgroundColor: "white" }}>
          <SideMenu selectedKeys={selectedKeys} />
        </Header>
        <Layout>
          <Content
            style={{ padding: "12px", overflow: "initial" }}
            className="bg-blog bg-center bg-no-repeat bg-cover"
          >
            <Main />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
}

export default withRouter(Homepage);

/*

      <Flex
        vertical
        className="justify-center items-center p-8 border border-gray-600 w-72 border-solid bg-white bg-opacity-80"
      >
        <h1 className="text-lg font-bold">Function List</h1>
        <Divider />

        <Space direction="vertical" size={4} align="center">
          <Button
            className="w-24"
            onClick={() => {
              navigate("/cabo");
            }}
          >
            Cabo
          </Button>
          <Button
            className="w-24"
            onClick={() => {
              if (!hasLoggedIn) {
                setOpenLogin(true);
                return;
              }
              navigate("/ai-editor");
            }}
          >
            AI Editor
          </Button>
        </Space>
      </Flex>

*/
