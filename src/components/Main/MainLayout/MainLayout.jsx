import style from './MainLayout.module.scss';
import Header from '../../Header/Header.jsx';
import MainContainer from '../MainContainer/MainContainer';

function MainLayout({children}) {
    return <div className={style.MainLayout}>
        <Header />
        <MainContainer>
            {children}
        </MainContainer>
    </div>
}

export default MainLayout;