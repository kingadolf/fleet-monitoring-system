import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import Truck from "../src/pages/truckPage";
import Navbar from "./components/Navbar";
import PettyCash from "./pages/pettyCash";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trucks" element={<Truck />} />
        <Route path="/petty-cash" element={<PettyCash />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;