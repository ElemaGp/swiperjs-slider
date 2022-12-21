import './App.css';
import Home from './pages/home/Home';
import MultipleSlides from './pages/multipleslides/MultipleSlides';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="multipleslides" element={<MultipleSlides />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
