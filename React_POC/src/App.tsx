import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

// Importing pages
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </BrowserRouter>
  );
};

export default App;
