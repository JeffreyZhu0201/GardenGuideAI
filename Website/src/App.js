
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route,Navigate } from 'react-router-dom'
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/analytics" element={<Analytics />} />
          <Route path="/newsletter" element={<Newsletter />} /> */}
        </Routes>
      <Footer />
    </>
  );
}

export default App;
