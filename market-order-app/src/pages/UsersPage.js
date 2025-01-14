import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ana rota AuthPage'i gösterecek */}
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
