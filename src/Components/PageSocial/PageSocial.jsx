import React from 'react';
import './PageSocial.css';
import { Link } from 'react-router-dom';

const PageSocial = () => {
    return (
        <div className="page-social">
            <Link to="/">
                <button className="back-button">Назад</button>
            </Link>
            <div className="social-item">
                <span>Социальная сеть 1</span>
                <button>Перейти</button>
            </div>
            <div className="social-item">
                <span>Социальная сеть 2</span>
                <button>Перейти</button>
            </div>
            <div className="social-item">
                <span>Социальная сеть 3</span>
                <button>Перейти</button>
            </div>
            <div className="social-item">
                <span>Социальная сеть 4</span>
                <button>Перейти</button>
            </div>
        </div>
    );
};

export default PageSocial;
