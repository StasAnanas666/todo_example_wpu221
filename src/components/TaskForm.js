import { useEffect, useState } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000/tasks";

const TaskForm = ({ todo, reset }) => {
    //создаем состояние todos с начальным значением [], которое будет изменяться при вызове setTodos
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDeadline(todo.deadline);
            setPriority(todo.priority);
        }
    }, [todo]);

    //добавление/изменение задачи
    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        try {
            if (todo) {
                const response = await axios.put(
                    `${serverUrl}/${todo.id}`,
                    {
                        title,
                        deadline,
                        priority,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data.message);
                setTitle("");
                setDeadline("");
                setPriority("");
            } else {
                const response = await axios.post(
                    serverUrl,
                    {
                        title,
                        deadline,
                        priority,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data.message);
                setTitle("");
                setDeadline("");
                setPriority("");
            }
            reset();
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    };

    return (
        <div className="container my-2">
            <h1 className="mb-4">TODO</h1>

            <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название задачи..."
                    />

                    <input
                        type="datetime-local"
                        className="form-control"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />

                    <select
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="" disabled>
                            Выберите приоритет...
                        </option>
                        <option value="Low">Низкий</option>
                        <option value="Medium">Средний</option>
                        <option value="High">Высокий</option>
                    </select>

                    <button
                        className="btn btn-outline-primary fw-bold"
                        type="submit"
                    >
                        {todo ? "Изменить" : "Добавить"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
