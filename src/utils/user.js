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

// export function useLoginModal() {
//   const [userInfo, setUserInfo] = useState(getUserInfo());
//   const navigate = 123;
//   return userInfo, (<Modal open={userInfo.id === undefined} onCancel={() => {}}>

//   </Modal>);
// }