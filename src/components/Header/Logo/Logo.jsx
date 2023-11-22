import style from './Logo.module.scss';
import LogoIcon from '../../../assets/icons/logo.png';
import { Link } from 'react-router-dom';

function Logo({ isAdmin }) {
    return (
    <Link to={isAdmin ? '/admin/tweet' : '/main'} className={style.logo}>
        <img src={LogoIcon} alt='Logo' />
    </Link>
    );
}

export default Logo;