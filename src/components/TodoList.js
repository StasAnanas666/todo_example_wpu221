import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "date-fns";

const serverUrl = "http://localhost:5000/tasks";

const TodoList = () => {
    //создаем состояние todos с нвалным значением [], которое будет изменяться при вызове setTodos
    const [todos, setTodos] = useState([]);

    //сработает один раз при открытии компонента и при изменении состояния todos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverUrl);
                setTodos(response.data);
            } catch (error) {
                console.error("Ошибка получения данных: ", error);
            }
        };
        fetchData();
    }, [todos]);

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`${serverUrl}/${id}`)
            //собираем задачи, которые не нужно удалять
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
        } catch (error) {
            console.error("Ошибка удаления задачи: ", error);
        }
    };

    const setPriorityColor = (priority) => {
        switch(priority) {
            case "Low":
                return "table-success";
            case "Medium":
                return "table-warning";
            case "High":
                return "table-danger";
            default:
                return ""; 
        }
    }

    return (
        <div className="container my-2">
            <table className="table table-hover align-middle my-5">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Выполнить до</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className={setPriorityColor(todo.priority)}>
                            <td>{todo.title}</td>
                            <td>
                            {
                                todo.deadline ? format(new Date(todo.deadline), "dd.MM.yyyy HH:mm") : ""
                            }
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
