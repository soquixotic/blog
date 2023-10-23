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
  const handleContinueWriting = useCallback(() => {
    const newText = text + "`<The function is still under development>`";
    setText(newText);
  }, [text]);

  return (
    <Flex vertical className="w-full h-full p-4">
      <h1>AI Editor</h1>
      <Button className="w-fit mb-4" onClick={handleContinueWriting}>
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
