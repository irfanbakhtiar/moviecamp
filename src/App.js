import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import MoviesIndex from "./pages/MoviesPage";
import "./index.css";

const App = () => {
  return (
    <div className="px-4 lg:px-8">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesIndex />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
