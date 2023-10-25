import React, { useCallback, useState } from "react";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Button, Flex } from "antd";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export function AIEditorPage() {
  const [text, setText] = useState("");
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

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluIiwid2lkIjoiMyIsImV4cCI6MTY5ODIyNDM1NH0.h0JBe_TFTYAzEWIz7z7Zb4cjOuwiLsUrwipN8xSztq0",
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
        console.error("Error:", error);
      });
  }

  return (
    <Flex vertical className="w-full h-full p-4">
      <h1>AI Editor</h1>
      <Button className="w-fit mb-4" onClick={onContinueWriting}>
        Continue writing
      </Button>

      <MdEditor
        style={{ height: "100%" }}
        value={text}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </Flex>
  );
}
