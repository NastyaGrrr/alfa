import React from 'react';
import styles from './styles.module.scss';
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";

type ItemListProps = {
    image: string,
    isLike: boolean,
    handleDelete: any
    handleLikes: any
    id: string
}

const ItemList: React.FC<ItemListProps> = ({image, isLike, handleDelete, handleLikes, id}) => (<div className={styles.container}>
    <img  className={styles.img} src={image} alt='img'/>
       <div className={styles.action}>{isLike ? <HeartFilled onClick={() => handleLikes(id)} /> :  <HeartOutlined onClick={() => handleLikes(id)} /> }
    <DeleteOutlined onClick={() => handleDelete(id)} /></div>
</div>);

export default ItemList;
