import React from 'react';
import './PageSocial.css';

const PageSocial = ({ className, onClose }) => {
    return (
        <div className={`page-social ${className}`}>
            <div className="social-item">
                Социальная сеть 1 <button>Перейти</button>
            </div>
            <div className="social-item">
                Социальная сеть 2 <button>Перейти</button>
            </div>
            <div className="social-item">
                Социальная сеть 3 <button>Перейти</button>
            </div>
            <div className="social-item">
                Социальная сеть 4 <button>Перейти</button>
            </div>
        </div>
    );
};

export default PageSocial;
