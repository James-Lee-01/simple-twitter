import style from './Header.module.scss';
import HeaderLink from './HeaderLink/HeaderLink';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext.jsx";


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
import { currentUser } from "../../contexts/AuthContext.jsx";

import { useState } from 'react';
import PostTweetModal from '../Modal/PostTweetModal/PostTweetModal'

function Header({ isAdmin }) {
    const { currentUser } = useAuthContext()
    const userId = currentUser.id

    ///////////Tweet Button/////////
		const avatar = currentUser.avatar

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
      //Modal開啟
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      //Modal關閉
      setIsModalOpen(false);
      
    };

    //////////////////////////////////////
    const links = [
        {
            path: '/main',
            text: '首頁',
            icon: HomeIcon,
            actionIcon: HomeActionIcon
        },
        {
            path: `/user/${userId}/tweet`,
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

    const adminLinks = [
        {
            path: '/admin/tweet',
            text: '推文清單',
            icon: HomeIcon,
            actionIcon: HomeActionIcon
        },
        {
            path: '/admin/user',
            text: '使用者列表',
            icon: UserIcon,
            actionIcon: UserActionIcon
        },
    ];

    const location = useLocation();
    const { logout } = useAuthContext();


    return (
      <div className={style.headerContainer}>
        {/* Modal Control */}
        {isModalOpen && (
          <PostTweetModal
            handleCloseModal={handleCloseModal}
            id={userId}
            // show={show}
            avatar={avatar}
          />
        )}
        <div className={style.header}>
          <div>
            <ItemContainer>
              <Logo />
            </ItemContainer>
            <div>
              {(isAdmin ? adminLinks : links).map((link, index) => (
                <HeaderLink
                  {...link}
                  action={location.pathname === link.path}
                  key={index}
                />
              ))}
            </div>
            {!isAdmin && (
              <ItemContainer>
                <button className={style.postButton} onClick={handleOpenModal}>
                  推文
                </button>
              </ItemContainer>
            )}
          </div>
          <div onClick={() => logout()}>
            <HeaderLink
              path='/login'
              text='登出'
              icon={SignoutIcon}
              actionIcon={SignoutActionIcon}
            />
          </div>
        </div>
      </div>
    );
}

export default Header;