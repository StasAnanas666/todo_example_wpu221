import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";

function App() {
    return (
        <>
            <TaskForm />
            <TodoList />
        </>
    );
}

export default App;
