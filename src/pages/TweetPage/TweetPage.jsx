import styles from './TweetPage.module.scss'
import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import SingleTweetCard from '../../components/Main/SingleTweetCard/SingleTweetCard';
import ReplyItem from '../../components/Main/ReplyListCard/ReplyListCard';
import SingleTweetReplyModal from '../../components/Modal/SingleTweetReplyModal/SingleTweetReplyModal.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTweet, getTweetReplies } from "../../api/tweet.js";
import { useDataChange } from '../../contexts/DataChangeContext';
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useLocation } from "react-router-dom";

export default function TweetPage() {
  //利用useParams的hook取得id值
  const param = useParams();
  const [tweet, setTweet] = useState("");
  const [user, setUser] = useState({});
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [replies, setReplies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDataChange } = useDataChange();

  const handleOpenModal = () => {
    setIsModalOpen(true); //Modal開啟
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); //Modal關閉
  };

  //Get Single Tweet API
  useEffect(() => {
    const getSingleTweet = async () => {
      try {
        const data = await getTweet(param.tweetId);

        if (data.id) {
          setTweet(data);
          setUser(data.User);
        }
        setTweet(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    getSingleTweet();
  }, [param.tweetId, isDataChange, replies]);

  //Get Reply Data API
  useEffect(() => {
    const getReplies = async () => {
      try {
        const data = await getTweetReplies(param.tweetId);
        if (data) {
          setReplies(data);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    getReplies();
  }, [param.tweetId, isDataChange, replies]);

  //data list mapping
  const repliesList = replies.map((reply) => {
    return (
      <ReplyItem
        key={reply.id}
        userId={reply.User.id}
        avatar={reply.User.avatar}
        account={reply.User.account}
        name={reply.User.name}
        createdAt={reply.createdAt}
        comment={reply.comment}
        tweetAccount={reply.repliesAccount}
        className={styles.replyItem}
      />
    );
  });

  //頁面導向限制
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [pathname, navigate, isAuthenticated]);


  return (
    <div className={styles.mainContainer}>
      <MainLayout>
        <Navbar title='推文' hasBack={true} />
        <div>
          {tweet && (
            <SingleTweetCard
              props={tweet}
              userProps={user}
              onClick={handleOpenModal}
            />
          )}
        </div>
        <div className={styles.listContainer}>
          {replies && repliesList}
        </div>
        {isModalOpen && (
          <SingleTweetReplyModal
            handleCloseModal={handleCloseModal}
            props={tweet}
          />
        )}
      </MainLayout>
    </div>
  );
}
