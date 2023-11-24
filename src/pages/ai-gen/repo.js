import { getUserToken } from "../../utils/user";

export async function genImage(prompt) {
  const result = await postWithAuth("https://api.zymx.tech/gpt/gen-image", {
    prompt: prompt,
  });
  return await result.json();
}

export function writeMore(prevText, onUpdate, onFinish, onError) {
  const url = "https://api.zymx.tech/gpt/continue-write";
  const decoder = new TextDecoder("utf-8");
  const textArr = [prevText];
  const formData = { prev_text: prevText };
  var encodedData = Object.keys(formData)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(formData[key]);
    })
    .join("&");
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
            onFinish();
            console.log("Stream complete");
            return;
          }

          // 处理接收到的数据
          const contentStr = decoder.decode(value);
          console.log("Received:", contentStr);
          textArr.push(contentStr);

          onUpdate(textArr.join(""));

          // 继续读取下一块数据
          reader.read().then(processStream);
        }

        reader.read().then(processStream);
      })
      .catch((error) => {
        onError();
        onFinish();
        console.error("Error:", error);
      });
  } catch (err) {
    onError();
    console.error("Error:", err);
  }
}



async function postWithAuth(url, bodyJson) {
  var encodedData = Object.keys(bodyJson)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(bodyJson[key]);
    })
    .join("&");
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: getUserToken(),
    },
    body: encodedData,
  });
}
