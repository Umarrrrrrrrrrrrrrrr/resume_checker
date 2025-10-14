import './Home.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home.jsx";
import NextPage from "./NextPage.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/next" element={<NextPage />}>

        </Route>
      </Routes>
    </Router>
  )
}
export default App; // ← ADD THIS LINE