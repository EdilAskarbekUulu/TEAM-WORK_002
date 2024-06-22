import React, { useEffect } from "react";
import { Link } from "react-router-dom";


export default function Header(){
    return(
        <>
        <header className="header">
            <div className="wraper">
                <div className="logo">
                    <h1>TeaMWork</h1>
                </div>
                <div className="navMenu">
                    <Link to="/">Главная</Link>
                    <Link>О нас</Link>
                    <Link>Сервис</Link>
                    <Link>Контакты</Link>
                </div>
                <div className="regis">
                    <button><Link to="/apply">Оставить заявку <img src="" alt="" /></Link></button>
                </div>
            </div>
        </header>
        </>
    )
}