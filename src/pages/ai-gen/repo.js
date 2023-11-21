import { getUserToken } from "../../utils/user";

export async function genImage(prompt) {
  const result = await postWithAuth("https://api.zymx.tech/gpt/gen-image", {
    prompt: prompt,
  });
  return await result.json();
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
