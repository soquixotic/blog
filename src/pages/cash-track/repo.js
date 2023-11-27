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

export async function fetchFamilyCategories() {
  const result = await getWithAuth("https://api.zymx.tech/family/categories");
  return await result.json();
}

export async function fetchFamilyRecords() {
  const now = new Date();
  const result = await getJsonWithAuth("https://api.zymx.tech/family/records", {
    time_range: { start_at: 123, end_at: now.getTime() },
  });
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

export async function deleteCategory(id) {
  const result = await postWithAuth("https://api.zymx.tech/category/delete", {
    id: id,
  });
  return await result.json();
}

export async function createCategory(name) {
  const result = await postWithAuth("https://api.zymx.tech/category/create", {
    name: name,
    type: 1,
  });
  return await result.json();
}

export async function createRecord(record) {
  const result = await postWithAuth(
    "https://api.zymx.tech/record/create",
    record
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

async function getJsonWithAuth(url, bodyJson) {
  var params = new URLSearchParams();
  for (let key in bodyJson) {
    if (typeof bodyJson[key] === "object") {
      for (let nestedKey in bodyJson[key]) {
        params.append(key + "[" + nestedKey + "]", bodyJson[key][nestedKey]);
      }
    } else {
      params.append(key, bodyJson[key]);
    }
  }

  var queryString = params.toString();

  return await fetch(`${url}?${queryString}`, {
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

// async function postJsonWithAuth(url, bodyJson) {
//   return await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: getUserToken(),
//     },
//     body: JSON.stringify(bodyJson),
//   });
// }