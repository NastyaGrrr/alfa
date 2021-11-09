import React, {useCallback} from 'react';
import styles from './styles.module.scss';
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";

type ItemListProps = {
    image: string,
    isLike: boolean,
    handleDelete: any
    handleLikes: any
    id: string
}

const ItemList: React.FC<ItemListProps> = ({image, isLike, handleDelete, handleLikes, id}) => {

    const setLike = useCallback(() => {
        handleLikes(id);
    },[handleLikes, id]);

    const deleteItem = useCallback(() => {
        handleDelete(id);
    },[handleDelete, id])

    return (<div className={styles.container}>
        <img className={styles.img} src={image} alt='img'/>
            {isLike ? <HeartFilled className={styles.like} onClick={setLike} /> :
                <HeartOutlined className={styles.like} onClick={setLike} />}
      <DeleteOutlined  className={styles.delete} onClick={deleteItem} />
    </div>);
}

export default React.memo(ItemList);
