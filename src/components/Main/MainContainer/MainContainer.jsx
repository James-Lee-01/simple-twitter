import style from './MainContainer.module.scss';
import SuggestUser from '../SuggestUser/SuggestUser';

function MainContainer({ children, extendMainContainer }) {
    return <div className={style.MainContainer}>
        <div className={style.Main}>
            <div className={`${style.timeline} ${extendMainContainer && style.extend}`}>
                {children}
            </div>

            {!extendMainContainer &&
                <div className={style.sidebarColumn}>
                    <SuggestUser />
                </div>
            }
        </div>
    </div>;
}

export default MainContainer;