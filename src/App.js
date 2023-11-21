import "./App.css";
import Homepage from "./pages/home";
import { GlobalStateProvider } from "./utils/globalState";

function App() {
  return (
    <div>
      <GlobalStateProvider>
        <Homepage />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
