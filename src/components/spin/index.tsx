import React from 'react';
import styles from './styles.module.scss';
import { LoadingOutlined } from "@ant-design/icons";


const Spin: React.FC = () => (<div className={styles.container}>
    <LoadingOutlined />
</div>);

export default Spin;
