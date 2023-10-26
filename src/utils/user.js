var userToken = "";

export function configUserToken(newToken) {
  userToken = "Bear " + newToken;
}

export function getUserToken() {
  return userToken;
}
