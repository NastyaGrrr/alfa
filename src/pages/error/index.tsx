import React from 'react';
import styles from './styles.module.scss';

const Error: React.FC = () => (
    <div className={styles.container}>
            <div className={styles.h1}>Страница не найдена</div>
            <div className={styles.subtitle}>ошибка 404</div>
    </div>
);

export default Error;
