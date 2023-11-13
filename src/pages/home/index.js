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