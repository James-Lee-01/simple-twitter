import style from './HeaderLink.module.scss';
import ItemContainer from '../ItemContainer/ItemContainer';
import { Link } from 'react-router-dom';


function HeaderLink(props) {
    

    return ( 
        <ItemContainer>
            <Link to={props.path} className={`${style.headerLink} ${props.action && style.action}`} >
                <img src={props.action ? props.actionIcon : props.icon} alt="LinkIcon" />
                <div>{props.text}</div>
            </Link>
        </ItemContainer>
    )
}

export default HeaderLink;