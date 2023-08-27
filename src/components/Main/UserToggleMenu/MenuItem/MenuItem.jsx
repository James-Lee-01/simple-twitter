import style from "./MenuItem.module.scss";
import { Link } from "react-router-dom";

function MenuItem({ title, link, action }) {
    return <Link to={link} className={`${style.menuItem} ${action ? style.action : ""}`}>
        {title}
    </Link>
}

export default MenuItem;