import { Flex, Layout } from "antd";
import { useEffect, useState } from "react";

import TopMenu from "./menu";
import { Main } from "./main";
import { withRouter } from "../../utils/router";
import { useLocation } from "react-router-dom";
import { useLoginModal } from "../../utils/user";
import { useGlobalState } from "../../utils/globalState";

const { Header, Content } = Layout;

function Homepage() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();
  const [userInfo, modalHolder] = useLoginModal();
  const { globalState, setGlobalState } = useGlobalState();
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  return (
    <Flex
      className={`items-center h-full w-full`}
      vertical
      style={{ minWidth: "375px" }}
    >
      {modalHolder}
      <Layout style={{ minHeight: "100vh" }} className="w-full items-center">
        <Header
          style={{ padding: "0", minWidth: "375px", maxWidth: "750px" }}
          className="flex justify-center fixed w-full z-10 bg-gray-50 bg-opacity-0 items-center"
        >
          <div style={{}} className="w-full bg-opacity-0">
            <TopMenu selectedKeys={selectedKeys} className="w-full" />
          </div>
          <div
            className="bg-blue-400 text-white font-bold px-3 h-16 align-middle hover:cursor-pointer select-none"
            onClick={() => {
              if (!userInfo.username) {
                setGlobalState({ ...globalState, isLoginModalOpen: true });
              }
            }}
          >
            {userInfo.username ?? "Login"}
          </div>
        </Header>
        <Layout className="h-screen overflow-hidden w-full">
          <Content
            style={{
              padding: "0px",
              paddingTop: "64px",
              overflow: "initial",
            }}
            className="bg-blog bg-center bg-no-repeat bg-cover flex justify-center"
          >
            <div
              style={{ maxWidth: "750px", minWidth: "375px" }}
              className="w-full bg-white bg-opacity-50 overflow-auto"
            >
              <Main style={{ overflow: "auto" }} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
}

export default withRouter(Homepage);