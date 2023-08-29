import style from "./Modal.module.scss";
import CancelIcon from "../../assets/icons/modal/modal_esc.png"

function Modal(props) {
    return <div className={`${style.modalShadow} ${!props.show && style.hidden}`}>
        <div className={style.modal}>
            <div className={style.modalHeader}>
                <img
                    src={CancelIcon}
                    className={style.CancelIcon}
                    onClick={props.onClose}
                />
                {props.headerComponent}
            </div>
            {props.children}
            {props.buttons && <div className={style.modalFooter}>
                {props.buttons}
            </div>}
        </div>
    </div>
}

export default Modal;