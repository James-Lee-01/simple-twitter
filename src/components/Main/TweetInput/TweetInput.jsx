import style from './TweetInput.module.scss';

function TweetInput() {
    return <div className={style.post}>
        <div className={style.postAvatar}>
            <div className={style.avatar}></div>
        </div>
        <div className={style.postContent}>
            <input type="text" placeholder="有什麼新鮮事？" />
            <div className={style.postButton}>
                <button>推文</button>
            </div>
        </div>
    </div>
}

export default TweetInput;