import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/home";
import { CaboEntryPage } from "./pages/cabo";
import { AIEditorPage } from "./pages/ai-editor";
import { CaboScoreBoardPage } from "./pages/cabo/score-board";

function App() {
  return (
    <div className="h-full w-full bg-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cabo" element={<CaboEntryPage />} />
          <Route path="/cabo/board" element={<CaboScoreBoardPage />} />
          <Route path="/ai-editor" element={<AIEditorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
