import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const serverUrl = "http://localhost:5000/register";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(serverUrl, {
                username,
                password,
            });
            navigate("/login");
        } catch (error) {
            console.error(error);
            setError("Ошибка регистрации: ", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-5">Регистрация</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="username" className="form-label">Имя пользователя: </label>
                    <input id="username" type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Пароль: </label>
                    <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-outline-primary my-2" type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
