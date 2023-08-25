import style from './Logo.module.scss';
import LogoIcon from '../../../assets/icons/logo.png';
import { Link } from 'react-router-dom';

function Logo() {
    return <Link to="/main" className={style.logo}>
        <img src={LogoIcon} alt="Logo" />
    </Link>;
}

export default Logo;