import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GlobalBackground from "./components/GlobalBackground";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <GlobalBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;