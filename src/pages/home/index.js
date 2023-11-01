import { Modal } from "antd";
import { Input } from "antd";
import { Space, message } from "antd";
import { Flex, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { configUserToken, getUserToken } from "../../utils/user";

export function Homepage() {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (openLogin === false) {
      setUsername("");
      setPassword("");
    }
    const token = getUserToken();
    setHasLoggedIn(token && token !== "");
  }, [openLogin]);

  const trySignIn = () => {
    const formData = { username: username, password: password };
    var encodedData = Object.keys(formData)
      .map(function (key) {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        );
      })
      .join("&");
    fetch("https://api.zymx.tech/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 0) {
          configUserToken(data.data.token);
          setOpenLogin(false);
          setHasLoggedIn(true);
          messageApi.success("Signed in: " + data.data.user.username);
          navigate("/ai-editor");
          return;
        }
        messageApi.error("Error: " + data.message);
      });
  };

  return (
    <Flex className={`justify-center items-center h-full`}>
      {contextHolder}
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
      <Modal
        centered
        open={openLogin}
        okText={"Sign in"}
        onCancel={() => {
          setOpenLogin(false);
        }}
        onOk={() => {
          trySignIn();
        }}
      >
        <Flex vertical className="space-y-4 pt-8">
          <Flex className="space-x-4">
            <p className="w-20">Username</p>
            <Input
              value={username}
              onChange={(value) => {
                setUsername(value.target.value);
              }}
            />
          </Flex>
          <Flex className="space-x-4">
            <p className="w-20">Password</p>
            <Input
              type="password"
              value={password}
              onChange={(value) => {
                setPassword(value.target.value);
              }}
            />
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
}
