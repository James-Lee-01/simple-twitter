import MenuItem from "./MenuItem/MenuItem";
import style from "./UserToggleMenu.module.scss";
import { useLocation } from "react-router";

function UserToggleMenu({ linkList }) {    
    const location = useLocation();

    return <div className={style.userToggleMenu}>
        {linkList.map((item, index) => 
            <MenuItem {...item} key={index} action={location.pathname === item.link} />
        )}
    </div>
}

export default UserToggleMenu;