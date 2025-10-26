import './Home.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home.jsx";
import NextPage from "./NextPage.jsx";
import aiupgrade from "./aiupgrade.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/next" element={<NextPage />}></Route>
        <Route path="/aiupgrade" element={<aiupgrade />}>

        </Route>
      </Routes>
    </Router>
  )
}
export default App; // ← ADD THIS LINE