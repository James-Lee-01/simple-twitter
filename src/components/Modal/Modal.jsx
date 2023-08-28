import style from "./Modal.module.scss";
import CancelIcon from "../../assets/icons/modal/modal_esc.png"

function Modal(props) {
    return <div className={style.modalShadow}>
        <div className={style.modal}>
            <div className={style.modalHeader}>
                <img
                    src={CancelIcon}
                    className={style.CancelIcon}
                    onClick={props.onClose}
                />
            </div>
            <div className={style.modalBody}>
                {props.children}
            </div>
            {props.buttons && <div className={style.modalFooter}>
                {props.buttons}
            </div>}
        </div>
    </div>
}

export default Modal;