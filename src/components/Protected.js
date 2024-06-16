import { useState, useEffect } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000/protected";

const Protected = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            const token = localStorage.getItem("token");
            if(token) {
                try {
                    const response = await axios.get(serverUrl, {headers: {Authorization: `Bearer ${token}`}});
                    setUserData(response.data.user);
                    console.log(userData);
                } catch (error) {
                    console.error("Ошибка получения данных пользователя: ", error);
                }
            }
        }
        fetchData();
    }, []);

    if(!userData) {
        <p>Loading...</p>
    }

    return (
        <div className="mt-5 d-flex justify-content-center align-items-center bg-dark">
            <h2 className="text-center text-light">
                Пользователь: 
            </h2>
            {/* <p>Имя: {userData.username}</p>
            <p>Роль: {userData.role}</p> */}
        </div>
    )
}

export default Protected;