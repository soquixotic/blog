var userData = {};

export function configUserData(data) {
  userData = data;
}

export function getUserToken() {
  return "Bear " + userData.token ?? "";
}

export function getUserInfo() {
  return userData.user ?? {};
}
