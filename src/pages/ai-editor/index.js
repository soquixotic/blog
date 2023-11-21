import React, { useCallback, useState } from "react";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Button, Flex, message, Input } from "antd";
import { useEffect } from "react";
import { getUserToken, getUserInfo } from "../../utils/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createDraft, updateDraft, publishArticle, fetchArticle } from "./repo";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function AIEditorPage() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(getUserToken() !== "");
  const [article, setArticle] = useState({});
  const [params] = useSearchParams();

  const articleId = params.get("id");

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();
    setHasLoggedIn(userInfo.id !== undefined);
    if (articleId && hasLoggedIn) {
      fetchArticle(articleId).then((result) => {
        console.log(result);
        if (result.code === 0) {
          // set article
          const article = result.data.article;
          if (userInfo.id === article.user_id) {
            article.id = article.draft_id;
            article.article_id = articleId;
            setArticle(article);
            setContent(article.content);
          }
        }
      });
    }
  }, [openLogin, articleId, hasLoggedIn]);

  useEffect(() => {
    if (!hasLoggedIn) {
      setOpenLogin(true);
    }
  }, [hasLoggedIn]);

  const handleEditorChange = useCallback(
    ({ _, text: newText }) => {
      article.content = newText;
      setContent(newText);
      setArticle({ ...article });
    },
    [article]
  );

  async function onContinueWriting() {
    const url = "https://api.zymx.tech/gpt/continue-write";
    const decoder = new TextDecoder("utf-8");
    const textArr = [content];
    const formData = { prev_text: content };
    var encodedData = Object.keys(formData)
      .map(function (key) {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        );
      })
      .join("&");
    setIsLoading(true);
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
              setIsLoading(false);
              return;
            }

            // 处理接收到的数据
            const contentStr = decoder.decode(value);
            console.log("Received:", contentStr);
            textArr.push(contentStr);

            setContent(textArr.join(""));

            // 继续读取下一块数据
            reader.read().then(processStream);
          }

          reader.read().then(processStream);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error:", error);
        });
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function onSaveDraft() {
    setIsLoading(true);
    let isCreate = true;
    if (article.id !== undefined) {
      isCreate = false;
    }

    try {
      if (isCreate) {
        await createDraft(article, (id) => {
          article.id = id;
          setArticle({ ...article });
        });
      } else {
        await updateDraft(article, (id) => {
          article.id = id;
          setArticle({ ...article });
        });
      }
      messageApi.success("Save draft successfully!");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function onPublish() {
    setIsLoading(true);
    try {
      await publishArticle(article, (articleId) => {
        article.article_id = articleId;
        setArticle({ ...article });
        navigate("/article?id=" + articleId);
      });
      messageApi.success("Publish successfully!");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Flex vertical className="w-full h-full p-4 min-h-screen">
      {contextHolder}
      <Flex className="mb-4 justify-between">
        <Button
          className="w-fit mr-4"
          onClick={onContinueWriting}
          loading={isLoading}
        >
          Continue writing
        </Button>
        <Flex>
          <Button
            className="w-fit mr-4"
            onClick={onSaveDraft}
            loading={isLoading}
            disabled={article.title === undefined}
          >
            Save Draft
          </Button>
          <Button
            className="w-fit"
            onClick={onPublish}
            loading={isLoading}
            disabled={article.id === undefined}
          >
            Publish
          </Button>
        </Flex>
      </Flex>

      <Flex className="mb-4" vertical>
        <label className="mr-4 mb-2 font-semibold">Title: </label>
        <Input
          className=""
          onChange={(e) => {
            article.title = e.target.value;
            setArticle({ ...article });
          }}
          value={article.title}
        ></Input>
      </Flex>

      <Flex className="mb-4" vertical>
        <label className="mr-4 mb-2 font-semibold">Brief: </label>
        <Input.TextArea
          rows={4}
          onChange={(e) => {
            article.brief = e.target.value;
            setArticle({ ...article });
          }}
          value={article.brief}
        />
      </Flex>

      <label className="mr-4 mb-2 font-semibold">Content: </label>
      <MdEditor
        style={{ minHeight: "80vh" }}
        readOnly={isLoading}
        value={content}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </Flex>
  );
}
