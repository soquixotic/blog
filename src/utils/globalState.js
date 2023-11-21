import { createContext, useContext, useState, useEffect } from "react";

// 创建一个 Context
const GlobalStateContext = createContext();

// 提供一个自定义 Hook 用于在组件中使用全局状态
export const useGlobalState = () => useContext(GlobalStateContext);

const initialGlobalState = {
  isLoginModalOpen: false,
  userData: {},
};

// 创建一个全局状态的提供器组件
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(initialGlobalState);

  // 在这里可以进行全局状态的初始化，比如从本地存储中获取之前保存的状态

  useEffect(() => {
    // 在这里可以监听全局状态的变化
    console.log("Global State Updated:", globalState);
  }, [globalState]);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
