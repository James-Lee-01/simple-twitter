import Modal from "../Modal";
import style from "./UserEditModal.module.scss";
import CancelIcon from "../../../assets/icons/modal/modal_cancel.png";
import UploadIcon from "../../../assets/icons/modal/modal_upload.png";
import { useState } from "react";
import logo_gray from "../../../assets/icons/logo_gray.png";
import AuthInput from "../../AuthInput/AuthInput";
import profileBG from "../../../assets/images/profileBG.jpeg";
import Button from "../../Button/Button";

import useUpdateChange from "../../../hooks/useUpdateChange";
import { useDataChange } from "../../../contexts/DataChangeContext";

function UserEditModal({
  originCoverPhoto,
  originAvatar,
  originName,
  originIntroduction,
  handleCloseModal,
  id,
}) {
  const [coverPhoto, setCoverPhoto] = useState(originCoverPhoto || profileBG);
	const [updateCoverPhoto, setUpdateCoverPhoto] = useState(coverPhoto);
  const [avatar, setAvatar] = useState(originAvatar || logo_gray);
	const [updateAvatar, setUpdateAvatar] = useState(avatar);
  const [name, setName] = useState(originName);
  const [introduction, setIntroduction] = useState(originIntroduction || "");

  const { isUpdating, updateUserInfo } = useUpdateChange();

  const { isDataChange, setIsDataChange } = useDataChange(); ////
  //////Change Image/////////
  const handleImgChange = (event, type) => {
    if (!event.target.files[0]) {
      return;
    }
    if (isUpdating) return;
    const selectFile = event.target.files[0];
    const objectURL = URL.createObjectURL(selectFile);
    ///如果是封面相片
    if (type === "cover") {
      setUpdateCoverPhoto(selectFile);
      // setCoverPhoto(objectURL);
    } else if (type === "avatar") {
      ///如果是頭貼相片
      setUpdateAvatar(selectFile);
      setAvatar(objectURL);
    }
  };

  /////////////////////////////
	const handleCancelImg = () => {
    if (isUpdating) return;
    setCoverPhoto(originCoverPhoto);
    // setUpdateCoverPhoto(null);
  };

  // const handleCloseIcon = (event) => {
  //   if (isUpdating) return;
    
  //   // onClose(); ////pause
  // };

  const handleSubmit = async () => {
    if (!name || name.length > 50) {
      return;
    }
    if (introduction.length > 160) {
      return;
    }
    await updateUserInfo({
      updateCoverPhoto,
      updateAvatar,
      name,
      introduction,
      id,
    });
		await setIsDataChange(!isDataChange)
  };

	const handleCloseModalAtBg = (event) => {
    if (isUpdating) return;
    if (event.target.classList.contains(style.modalOverlay)) {
      handleCloseModal();
    }
  };

  
  return (
    <div className={style.modalOverlay} 
		onClick={handleCloseModalAtBg}
		>
      <Modal 
				onClose={handleCloseModal}
				onClick={handleCloseModal}

        headerComponent={
          <div className={style.headerContainer}>
            <div className={style.title}>編輯個人資料</div>
            <Button
              // className={style.saveButton}
              title='儲存'
              size='small'
              isActive
              onClick={handleSubmit}
            />
          </div>
        }
        // show={prop.show}
      >
        <div className={style.userWrapper}>
          <div className={style.photoIcon}>
            <label className={style.upload} htmlFor='coverInput'>
              <img
                src={UploadIcon}
                alt='UploadIcon'
                className={style.uploadIcon}
              />
              <input
                className={style.fileInput}
                type='file'
                id='coverInput'
                onChange={(event) => handleImgChange(event, "cover")}
              />
            </label>

            {/* Cancel icon */}
            <div className={style.cancel} 
						onClick={handleCancelImg}
						>
              <img
                src={CancelIcon}
                alt='CancelIcon'
                className={style.cancelIcon}
              />
            </div>
          </div>
          <div className={style.coverPhoto}>
            <img
              className={style.coverPhoto}
              src={coverPhoto}
              alt='coverPhoto'
            />
          </div>
          <div className={style.userAvatar}>
            {/* <div className={style.avatar}> */}
            <img className={style.avatar} src={avatar} alt='avatar' />
            {/* </div> */}
            <label className={style.avatarUpload} htmlFor='avatarInput'>
              <img
                className={style.uploadIcon}
                src={UploadIcon}
                alt='UploadIcon'
              />
              <input
                className={style.fileInput}
                type='file'
                id='avatarInput'
                onChange={(event) => handleImgChange(event, "avatar")}
              />
            </label>
          </div>
          <div className={style.userEditInfo}>
            <div className={style.nameEdit}>
              <div className={style.inputGroup}>
                {/* <label>名稱</label>
                <input type='text' value='John Doe' /> */}
                <AuthInput
                  labelName='名稱'
                  type='text'
                  value={name}
                  placeholder=''
                  onChange={(nameInput) => setName(nameInput)}
                  notification='字數超出限制'
                  lengthLimit={50}
                />
              </div>
            </div>
            <div className={style.introductionEdit}>
              <div className={style.inputGroup}>
                <AuthInput
                  labelName='自我介紹'
                  type='text'
                  value={introduction}
                  placeholder=''
                  onChange={(infoInput) => setIntroduction(infoInput)}
                  notification='字數超出限制'
                  lengthLimit={160}
                />
                {/* <label>自我介紹</label>
                <textarea></textarea> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserEditModal;
