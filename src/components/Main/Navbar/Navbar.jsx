import style from './Navbar.module.scss';
import backIcon from '../../../assets//icons/arrow.png';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();

    return <div className={style.navbar}>
        {props.hasBack && 
            <div onClick={navigate.bind(this, -1)} className={style.backButton}>
                <img src={backIcon} alt='backIcon' />
            </div>
        }
        {
            props.children ??
            <div className={style.title}>
                {props.title}
            </div>
        }
    </div>;
}

export default Navbar;