import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Highlights from "./Pages/Highlights";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FirstSetup from "./Pages/FirstSetup";
import TimeRoom from "./Pages/TimeRoom";
 
function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/firstsetup" element={<FirstSetup/>} />
        <Route path="/timeroom" element={<TimeRoom/>} />
      </Routes>
    </>
  )
}

export default App
