import Modal from "../Modal";
import style from "../../Main/TweetInput/TweetInput.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useDataChange } from "../../../contexts/DataChangeContext";
import usePost from "../../../hooks/usePost.js";

function PostTweetModal({
  handleCloseModal,
  id,
  avatar,
}) {
  const [show, setShow] = useState(true);
  //Message
  const [msg, setMsg] = useState("");
  //文字變化
  const [textInput, setTextInput] = useState("");
  //自建hook
  const { isUpdating,postTweetContent } = usePost();
  const { isDataChange, setIsDataChange } = useDataChange();

  //CSS styles switch
  const limitClassName = clsx(style.limit, { [style.active]: msg });
  
  ///////////推文按鈕發送////////////
  const handleSubmitTweet = async () => {
    if (textInput.trim().length === 0) {
      ///不可空白
      setMsg("內容不可空白");
      return;
    }
    if (textInput.length > 140) {
      ///字數不超過140字
      setMsg("字數不可超過140字");
      return;
    }
    await postTweetContent(textInput);
    await setTextInput(""); //清空
    await setIsDataChange(!isDataChange);
    if (!isUpdating) {
      setShow(false);
      handleCloseModal();
    }
  };

  const handleCloseModalAtBg = (event) => {
    if (!isUpdating) return;
    if (event.target.classList.contains(style.modalOverlay)) {
      handleCloseModal();
    }
  };

  return (
    <div className={style.modalOverlay} onClick={handleCloseModalAtBg}>
      <Modal onClose={handleCloseModal} show={show}>
        <div className={style.post}>
          <div className={style.postAvatar}>
            <img className={style.avatar} src={avatar} alt='avatar' />
          </div>
          <div className={style.postContent}>
            <textarea
              className={style.textarea}
              type='text'
              value={textInput}
              placeholder='有什麼新鮮事？'
              onChange={(event) => setTextInput(event.target.value)}
            ></textarea>

            <div className={style.postButton}>
              <span className={limitClassName}>{msg}</span>
              <button onClick={handleSubmitTweet}>推文</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PostTweetModal;
