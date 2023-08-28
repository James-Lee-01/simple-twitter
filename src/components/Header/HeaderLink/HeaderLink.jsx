import style from './HeaderLink.module.scss';
import ItemContainer from '../ItemContainer/ItemContainer';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext.jsx' 

function HeaderLink(props) {
    const { logout } = useAuthContext();

    return ( 
        <ItemContainer>
            <Link to={props.path} className={`${style.headerLink} ${props.action && style.action}`} >
                <img src={props.action ? props.actionIcon : props.icon} alt="LinkIcon" />
                <div onClick={() => logout()}>{props.text}</div>
            </Link>
        </ItemContainer>
    )
}

export default HeaderLink;