import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/home";
import { CaboEntryPage } from "./pages/cabo";

function App() {
  return (
    <div className="h-full w-full bg-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cabo" element={<CaboEntryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
