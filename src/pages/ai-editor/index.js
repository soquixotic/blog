import React, { useCallback, useState } from "react";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Button, Flex } from "antd";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export function AIEditorPage() {
  const [text, setText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
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
          Authorization:
            "Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluIiwid2lkIjoiMSIsImV4cCI6MTY5ODMwODM4M30.SolZal30n_PocpxBKAd6R-JZazFRnodG2poBi8iqC64",
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
    <Flex vertical className="w-full h-full p-4">
      <h1>AI Editor</h1>
      <Button
        className="w-fit mb-4"
        onClick={onContinueWriting}
        loading={isWriting}
      >
        Continue writing
      </Button>

      <MdEditor
        style={{ height: "100%" }}
        readOnly={isWriting}
        value={text}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </Flex>
  );
}
