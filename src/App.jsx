import "./App.css";
import LandingPage from "./pages/LandingPage";
import StatsPage from "./pages/StatsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import MatchingContainer from "./containers/MatchingContainer";
import MokuPage from "./pages/MokuPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/hi" element={<MatchingContainer />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/stats" element={<StatsPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/play-moku" element={<MokuPage />}></Route>
        </Routes>

        <MatchingContainer />
        <ToastContainer
          autoClose={2000}
          pauseOnHover
          newestOnTop={true}
          closeOnClick
        />
      </div>
    </Router>
  );
}

export default App;
