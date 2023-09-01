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

	const [show, setShow] = useState(true);

  const { isUpdating, updateUserInfo } = useUpdateChange();

  const [nameMsg, setNameMsg] = useState("");
  const [introMsg, setIntroMsg] = useState('')

  const { isDataChange, setIsDataChange } = useDataChange(); ////


  ////Change Image/////////
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
      setCoverPhoto(objectURL);
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
    setUpdateCoverPhoto(null);
  };

  // const handleCloseIcon = (event) => {
  //   if (isUpdating) {
	// 		setShow(false)
	// 		return;
	// 	}
		
  //   onClose(); ////pause
  // };

  const handleSubmit = async () => {
    if (!name) {
      setNameMsg("請輸入名稱");
      return;
    }
    if (name.length > 50) {
      setNameMsg("字數超出上限");
      return;
    }
    if (introduction.length > 160) {
      setIntroMsg("字數超出上限");
      return;
    }
		///以下為傳送至API的value名稱
    await updateUserInfo({
      updateCoverPhoto,
      updateAvatar,
      name,
      introduction,
      id,
    });
		await setIsDataChange(!isDataChange)
		if (!isUpdating) {
      setShow(false);
      handleCloseModal();
    }
    console.log(updateUserInfo);///
  };

	const handleCloseModalAtBg = (event) => {
    if (!isUpdating) return;
    if (event.target.classList.contains(style.modalOverlay)) {
      handleCloseModal();
    }
  };

  /////////////////////

  /////////////////////

  
  return (
    <div className={style.modalOverlay} onClick={handleCloseModalAtBg}>
      <Modal
        onClose={handleCloseModal}
        show={show}
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
      >
        <div className={style.userWrapper}>
          <div className={style.photoIcon}>
            <label className={style.upload} htmlFor='cover'>
              <img
                src={UploadIcon}
                alt='UploadIcon'
                className={style.uploadIcon}
              />
              <input
                className={style.fileInput}
                type='file'
                id='cover'
                name='cover'
                onChange={(event) => handleImgChange(event, "cover")}
              />
            </label>

            {/* Cancel icon */}
            <div className={style.cancel} onClick={handleCancelImg}>
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
            <label className={style.avatarUpload} htmlFor='avatar'>
              <img
                className={style.uploadIcon}
                src={UploadIcon}
                alt='UploadIcon'
              />
              <input
                className={style.fileInput}
                type='file'
                id='avatar'
                name='avatar'
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
                  placeholder='請輸入名稱'
                  onChange={(nameInput) => setName(nameInput)}
                  notification={nameMsg}
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
                  placeholder='請輸入自我介紹'
                  onChange={(infoInput) => setIntroduction(infoInput)}
                  notification={introMsg}
                  lengthLimit={160}
                  // className={style.textarea}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserEditModal;
