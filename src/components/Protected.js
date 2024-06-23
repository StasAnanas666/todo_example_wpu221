import { useState, useEffect } from "react";
import axios from "axios";

const Protected = ({ isAuthenticated, username, role }) => {
    console.log(isAuthenticated);
    console.log(username);
    console.log(role);

    if (!isAuthenticated) {
        return (
            <p className="min-h-100 d-flex justify-content-between align-items-center">
                Loading...
            </p>
        );
    }

    return (
        <>
            {isAuthenticated && (
                <div className="container">
                <div class="card w-100 my-3">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Пользователь:</h5>
                        <p class="card-text">Имя: {username}</p>
                        <p class="card-text">Роль: {role}</p>
                    </div>
                </div>
                </div>
                
            )}
        </>
    );
};

export default Protected;
