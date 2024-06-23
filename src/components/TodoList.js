import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { VscCheck } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { VscTrash } from "react-icons/vsc";

const serverUrl = "http://localhost:5000/tasks";

const TodoList = ({ setTodo }) => {
    //создаем состояние todos с начальным значением [], которое будет изменяться при вызове setTodos
    const [todos, setTodos] = useState([]);

    //сработает один раз при открытии компонента и при изменении состояния todos
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(serverUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTodos(response.data);
            } catch (error) {
                console.error("Ошибка получения данных: ", error);
            }
        };
        fetchData();
    }, [todos]);

    const handleEditClick = (todo) => {
        setTodo(todo);
    };

    const handleDeleteTodo = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${serverUrl}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            //собираем задачи, которые не нужно удалять
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
        } catch (error) {
            console.error("Ошибка удаления задачи: ", error);
        }
    };

    const handleCompleteClick = async(todo) => {
        const token = localStorage.getItem("token");
        const completed = !todo.completed;
        try {
            const response = await axios.put(
                `${serverUrl}/complete/${todo.id}`,
                {
                    completed
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data.message);
        } catch (error) {
            console.error("Ошибка: ", error);
        }
    }

    const setPriorityColor = (priority) => {
        switch (priority) {
            case "Low":
                return "table-success";
            case "Medium":
                return "table-warning";
            case "High":
                return "table-danger";
            default:
                return "";
        }
    };

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
                        <tr
                            key={todo.id}
                            className={setPriorityColor(todo.priority)}
                        >
                            <td style={{width: "65%"}}>{todo.title}</td>
                            <td>
                                {todo.deadline
                                    ? format(
                                          new Date(todo.deadline),
                                          "dd.MM.yyyy HH:mm"
                                      )
                                    : ""}
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-success me-3"
                                    onClick={() => handleCompleteClick(todo)}
                                >
                                    <VscCheck />
                                </button>
                                <button
                                    className="btn btn-outline-warning me-3"
                                    onClick={() => handleEditClick(todo)}
                                >
                                    <VscEdit />
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    <VscTrash />
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
