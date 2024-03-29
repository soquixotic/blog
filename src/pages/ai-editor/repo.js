import { getUserToken } from "../../utils/user";

export async function createDraft(article, onGetID) {
  const url = "https://api.zymx.tech/draft/create";
  const resp = await fetchWithAuth(url, article);
  const result = await resp.json();
  console.log(result);
  if (result.code === 0) {
    onGetID(result.data.id);
  }
}

export async function updateDraft(article, onGetID) {
  const url = "https://api.zymx.tech/draft/update";
  const resp = await fetchWithAuth(url, article);
  const result = await resp.json();
  console.log(result);
  if (result.code === 0) {
    onGetID(result.data.id);
  }
}

export async function publishArticle(article, onGetArticleID) {
  const url = "https://api.zymx.tech/draft/publish";
  article.draft_id = article.id;
  const resp = await fetchWithAuth(url, article);
  const result = await resp.json();
  console.log(result);
  if (result.code === 0) {
    onGetArticleID(result.data.article_id);
  }
}

export async function fetchArticle(id) {
  const url = "https://api.zymx.tech/article/get?id=" + id;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function uploadImage(file) {
  const formData = new FormData();

  console.log(file);

  // 将文件添加到 FormData
  formData.append("image", file);

  // 发送 POST 请求
  const resp = await fetch("http://api.zymx.tech/upload/image", {
    method: "POST",
    headers: {
      Authorization: getUserToken(),
    },
    body: formData,
  });
  const data = await resp.json();
  return data;
}

async function fetchWithAuth(url, bodyJson) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body: JSON.stringify(bodyJson),
  });
}

