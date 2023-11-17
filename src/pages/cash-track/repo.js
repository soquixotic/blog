import { getUserToken } from "../../utils/user";

export async function fetchFamilyAccounts() {
  const result = await getWithAuth("https://api.zymx.tech/family/accounts");
  return await result.json();
}

async function getWithAuth(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
  });
}

async function postWithAuth(url, bodyJson) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body: JSON.stringify(bodyJson),
  });
}
