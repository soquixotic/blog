import { Flex, Layout } from "antd";
import { useEffect, useState } from "react";

import TopMenu from "./menu";
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
    <Flex
      className={`items-center h-full w-full`}
      vertical
      style={{ minWidth: "375px" }}
    >
      <Layout style={{ minHeight: "100vh" }} className="w-full">
        <Header
          style={{ padding: "0", minWidth: "375px" }}
          className="flex justify-center fixed w-full z-10 bg-gray-50"
        >
          <div
            style={{ maxWidth: "750px", minWidth: "375px" }}
            className="w-full"
          >
            <TopMenu selectedKeys={selectedKeys} className="w-full" />
          </div>
        </Header>
        <Layout className="mt-16">
          <Content
            style={{
              padding: "0px",
              overflow: "initial",
            }}
            className="bg-blog bg-center bg-no-repeat bg-cover flex justify-center "
          >
            <div
              style={{ maxWidth: "750px", minWidth: "375px" }}
              className="w-full bg-white bg-opacity-50"
            >
              <Main style={{}} />
            </div>
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
