import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";         // Your main Git guide
import SSHSetup from "./pages/SSHSetup"; // Your SSH page (make this file)
import NotFound from "./pages/NotFound"; // Optional 404 fallback
import GitGuide from "./pages/GitGuide"; // Your Git guide page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ssh" element={<SSHSetup />} />
      <Route path="/gitguide" element={<GitGuide />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;