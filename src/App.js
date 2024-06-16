import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Protected from "./components/Protected";

function App() {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<Todo />} />
                <Route path="/protected" element={<Protected />} />
            </Routes>
        </Router>
    );
}

export default App;
