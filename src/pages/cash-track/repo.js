import { getUserToken } from "../../utils/user";

export const CurrencyMap = {
  1: "CNY",
  2: "HKD",
  3: "USD",
};
export const CurrencySymbol = {
  1: "￥",
  2: "HK$",
  3: "$",
};

export async function fetchFamilyAccounts() {
  const result = await getWithAuth("https://api.zymx.tech/family/accounts");
  return await result.json();
}

export async function createAccount(account) {
  const result = await postWithAuth(
    "https://api.zymx.tech/account/create",
    account
  );
  return await result.json();
}

export async function updateAccount(account) {
  const result = await postWithAuth(
    "https://api.zymx.tech/account/update",
    account
  );
  return await result.json();
}

export async function createFamily(family) {
  const result = await postWithAuth(
    "https://api.zymx.tech/family/create",
    family
  );
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
