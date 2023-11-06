import { Route, Routes } from "react-router-dom";
import { RouterPageList } from "../../Router";

export function Main() {
  return (
    <Routes>
      {RouterPageList.map((route) => {
        return (
          <Route
            exact
            path={route.path}
            key={route.path}
            element={route.component}
          ></Route>
        );
      })}
    </Routes>
  );
}
