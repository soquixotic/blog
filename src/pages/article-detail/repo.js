export async function fetchArticle(id) {
  const url = "https://api.zymx.tech/article/get?id=" + id;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
