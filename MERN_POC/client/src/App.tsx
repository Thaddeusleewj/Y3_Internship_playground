import React, { Fragment } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Importing pages & components
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
// Import HomePage when you're ready to use it
// import HomePage from './pages/HomePage';

// Importing stylesheet
import "./App.css";

const RoutesContainer = () => {
  // Finding path
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Fragment>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RoutesContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
