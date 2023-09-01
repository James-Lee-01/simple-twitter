import style from "./TweetInput.module.scss";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useAuthContext } from "../../../contexts/AuthContext"
import { getUser } from "../../../api/auth";
import  usePost from '../../../hooks/usePost.js'
import { useDataChange } from "../../../contexts/DataChangeContext";

function TweetInput() {
  //Message
  const [msg, setMsg] = useState("");
  //文字變化
  const [textInput, setTextInput] = useState("");
  //身份擷取
  const [userProfile, setUserProfile] = useState("");
  //需對照使用者身份
  const { currentUser } = useAuthContext();
  const userId = currentUser && currentUser.id;

	//自建hook
  const { postTweetContent } = usePost();

	const { isDataChange, setIsDataChange } = useDataChange()


  //CSS styles switch
  const limitClassName = clsx(style.limit, { [style.active]: msg });
  // const textAreaClassName = clsx(style.textarea, {
  //   [style.active]: textInput.length > 0,
  // });

  //身份抓取(錯誤版本)
  // useEffect(() => {
  // 	console.log(currentUser);
  //   const getUserInformation = async () => {
  //     try {
  //       const data = await getUser(userId);
  //       if (data.status === "error") {
  //         console.log(data.message);
  // 				return
  //       }
  // 			if (data) {
  //         await setUserProfile(data);
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.error("[getUserInformation Failed]", error);
  //     }
  //   };
  //   getUserInformation();
  // }, [userId]);
  useEffect(() => {
		// console.log('1',currentUser);
    const getUserInfo = async () => {
      try {
        if (userId) {
          const data = await getUser(userId);
          if (data.status === "error") {
            console.log(data.message);
            return;
          }
          if (data) {
            // update data
            await setUserProfile(data);
            console.log(data);
          }
        }
      } catch (error) {
        console.log("getUser Failed", error);
      }
    };
    getUserInfo();
  }, [userId, isDataChange]); ////

  ////////////////////////////
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
    window.location.reload()
  };

  ////////////////////////////

  return (
    <div className={style.post}>
      <div className={style.postAvatar}>
        <img className={style.avatar} src={userProfile.avatar} alt='avatar' />
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
  );
}

export default TweetInput;