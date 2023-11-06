import React, { useCallback, useState } from "react";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Button, Flex, message, Input, Modal } from "antd";
import { useEffect } from "react";
import { configUserToken, getUserToken } from "../../utils/user";
import { useNavigate } from "react-router-dom";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function AIEditorPage() {
  const [text, setText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoggedIn, setHasLoggedIn] = useState(getUserToken() !== "");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (openLogin === false) {
      setUsername("");
      setPassword("");
    }
    const token = getUserToken();
    setHasLoggedIn(token && token !== "");
  }, [openLogin]);

  useEffect(() => {
    if (!hasLoggedIn) {
      setOpenLogin(true);
    }
  }, [hasLoggedIn]);

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
          // navigate("/ai-editor");
          return;
        }
        messageApi.error("Error: " + data.message);
      });
  };

  const handleEditorChange = useCallback(({ _, text: newText }) => {
    console.log("handleEditorChange", newText);
    setText(newText);
  }, []);

  async function onContinueWriting() {
    const url = "https://api.zymx.tech/gpt/continue-write";
    const decoder = new TextDecoder("utf-8");
    const textArr = [text];
    const formData = { prev_text: text };
    var encodedData = Object.keys(formData)
      .map(function (key) {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        );
      })
      .join("&");
    setIsWriting(true);
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: getUserToken(),
        },
        body: encodedData,
      })
        .then((response) => {
          const reader = response.body.getReader();

          return new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }

                  controller.enqueue(value);
                  push();
                });
              }

              push();
            },
          });
        })
        .then((stream) => {
          const reader = stream.getReader();

          function processStream({ done, value }) {
            if (done) {
              console.log("Stream complete");
              setIsWriting(false);
              return;
            }

            // 处理接收到的数据
            const contentStr = decoder.decode(value);
            console.log("Received:", contentStr);
            textArr.push(contentStr);

            setText(textArr.join(""));

            // 继续读取下一块数据
            reader.read().then(processStream);
          }

          reader.read().then(processStream);
        })
        .catch((error) => {
          setIsWriting(false);
          console.error("Error:", error);
        });
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <Flex vertical className="w-full h-full p-4 min-h-screen">
      {contextHolder}
      <Button
        className="w-fit mb-4"
        onClick={onContinueWriting}
        loading={isWriting}
      >
        Continue writing
      </Button>

      <MdEditor
        style={{ minHeight: "80vh" }}
        readOnly={isWriting}
        value={text}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <Modal
        centered
        open={openLogin}
        okText={"Sign in"}
        onCancel={() => {
          navigate("/");
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
