import { useState } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000/tasks";

const TaskForm = () => {
    //создаем состояние todos с начальным значением [], которое будет изменяться при вызове setTodos
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("");

    //добавление задачи
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(serverUrl, {
                title,
                deadline,
                priority,
            });
            console.log("ID добавленной задачи: ", response.data.id);
            setTitle("");
            setDeadline("");
            setPriority("");
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

                    <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="" disabled>Выберите приоритет...</option>
                        <option value="Low">Низкий</option>
                        <option value="Medium">Средний</option>
                        <option value="High">Высокий</option>
                    </select>

                    <button
                        className="btn btn-outline-primary fw-bold"
                        type="submit"
                    >
                        +
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
