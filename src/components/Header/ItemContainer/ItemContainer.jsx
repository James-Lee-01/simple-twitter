import style from './ItemContainer.module.scss';

function ItemContainer(props) {
    return <div className={style.itemContainer}>
        {props.children}
    </div>;
}

export default ItemContainer;