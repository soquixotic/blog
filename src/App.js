import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/home";
import { CaboPage } from "./pages/cabo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cabo" element={<CaboPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
