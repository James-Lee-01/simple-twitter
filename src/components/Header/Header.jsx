import style from './Header.module.scss';
import HeaderLink from './HeaderLink/HeaderLink';
import { useLocation } from 'react-router-dom';

import HomeIcon from '../../assets/icons/nav/nav_home.png';
import HomeActionIcon from '../../assets/icons/nav/nav_home_action.png';
import UserIcon from '../../assets/icons/nav/nav_user.png';
import UserActionIcon from '../../assets/icons/nav/nav_user_action.png';
import SetIcon from '../../assets/icons/nav/nav_set.png';
import SetActionIcon from '../../assets/icons/nav/nav_set_action.png';
import SignoutIcon from '../../assets/icons/nav/nav_signout.png';
import SignoutActionIcon from '../../assets/icons/nav/nav_signout_action.png';
import ItemContainer from './ItemContainer/ItemContainer';
import Logo from './Logo/Logo';
import Button from '../Button/Button';

function Header() {
    const links = [
        {
            path: '/main',
            text: '首頁',
            icon: HomeIcon,
            actionIcon: HomeActionIcon
        },
        {
            path: '/profile',
            text: '個人資料',
            icon: UserIcon,
            actionIcon: UserActionIcon
        },
        {
            path: '/setting',
            text: '設定',
            icon: SetIcon,
            actionIcon: SetActionIcon
        },
    ];

    const location = useLocation();

    return <div className={style.headerContainer}>
        <div className={style.header}>
            <div>
                <ItemContainer>
                    <Logo />
                </ItemContainer>
                <div>
                    {links.map((link, index) => <HeaderLink
                        {...link}
                        action={location.pathname === link.path}
                        key={index}
                    />)}
                </div>
            </div>
            <HeaderLink
                path="/signout"
                text="登出"
                icon={SignoutIcon}
                actionIcon={SignoutActionIcon}
            />
        </div>
    </div>;
}

export default Header;