import { Modal, Flex, Input, message } from "antd";
import { useState } from "react";
import { useGlobalState } from "./globalState";

var userData = {};

export function configUserData(data) {
  userData = data;
}

export function getUserToken() {
  return "Bear " + userData.token ?? "";
}

export function getUserInfo() {
  return userData.user ?? {};
}

export function useLoginModalSwitch() {
  const { globalState, setGlobalState } = useGlobalState();
  const openLoginModal = () => {
    setGlobalState({ ...globalState, isLoginModalOpen: true });
  };
  const closeLoginModal = () => {
    setGlobalState({ ...globalState, isLoginModalOpen: false });
  };
  return [openLoginModal, closeLoginModal];
}

export function useUserData() {
  const { globalState } = useGlobalState();
  const userData = globalState.userData;
  return userData;
}

export function useLoginModal() {
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { globalState, setGlobalState } = useGlobalState();

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
          configUserData(data.data);
          globalState.isLoginModalOpen = false;
          globalState.userData = data.data;
          setGlobalState({ ...globalState });
          setUserInfo(data.data.user);
          messageApi.success("Signed in: " + data.data.user.username);
          // navigate("/ai-editor");
          return;
        }
        messageApi.error("Error: " + data.message);
      }).catch(err => {
        messageApi.error("Error: " + err);
      });
  };

  return [
    userInfo,
    <Modal
      open={globalState.isLoginModalOpen}
      onCancel={() => {
        globalState.isLoginModalOpen = false;
        setGlobalState({ ...globalState });
      }}
      onOk={() => {
        trySignIn();
      }}
    >
      {contextHolder}
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
    </Modal>,
  ];
}
