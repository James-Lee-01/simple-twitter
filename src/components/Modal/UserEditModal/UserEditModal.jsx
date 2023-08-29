import Modal from "../Modal";
import style from "./UserEditModal.module.scss";
import CancelIcon from "../../../assets/icons/modal/modal_cancel.png";
import UploadIcon from "../../../assets/icons/modal/modal_upload.png";

function UserEditModal(props) {
    return <Modal
        headerComponent={
            <div className={style.headerContainer}>
                <div className={style.title}>編輯個人資料</div>
                <button className={style.saveButton}>儲存</button>
            </div>

        }
        show={props.show}
        onClose={props.onClose}
    >
        <div className={style.userWrapper}>
            <div className={style.coverPhoto}>
                <div className={style.photoIcon}>
                    <img src={UploadIcon} alt="" />
                    <img src={CancelIcon} alt="" />
                </div>
            </div>
            <div className={style.userAvatar}>
                <div className={style.avatar}></div>
                <img className={style.uploadIcon} src={UploadIcon} alt="" />
            </div>
            <div className={style.userEditInfo}>
                <div className={`${style.nameEdit}`}>
                    <div className={style.inputGroup}>
                        <label>名稱</label>
                        <input type="text" value="John Doe"/>
                    </div>
                    <p>8/50</p>
                </div>
                <div className={style.introductionEdit}>
                    <div className={style.inputGroup}>
                        <label>自我介紹</label>
                        <textarea></textarea>
                    </div>
                    <p>0/160</p>
                </div>
            </div>
        </div>
    </Modal>
}

export default UserEditModal;