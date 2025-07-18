import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Highlights from "./Pages/Highlights";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login" element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
