import style from './MainLayout.module.scss';
import Header from '../../Header/Header.jsx';
import MainContainer from '../MainContainer/MainContainer';

function MainLayout({children, extendMainContainer, isAdmin}) {
    return <div className={style.MainLayout}>
        <Header isAdmin={isAdmin} />
        <MainContainer extendMainContainer={extendMainContainer}>
            {children}
        </MainContainer>
    </div>
}

export default MainLayout;