import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <nav className="py-3 px-5 bg-dark">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link text-light" aria-current="page" to="/tasks">
                        Задачи
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" aria-current="page" to="/protected">
                        Защищенная страница
                    </NavLink>
                </li>
                <li className="nav-item ms-auto">
                    <NavLink className="nav-link text-light" to="/register">
                        Регистрация
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/login">
                        Вход
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
