import style from './MainContainer.module.scss';
import SuggestUser from '../SuggestUser/SuggestUser';

function MainContainer({children}) {
    return <div className={style.MainContainer}>
        <div className={style.Main}>
            <div className={style.timeline}>
                {children}
            </div>

            {/* sidebar */}
            <div className={style.sidebarColumn}>
                <SuggestUser />
            </div>
        </div>
    </div>;
}

export default MainContainer;