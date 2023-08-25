import style from './SuggestUser.module.scss';
import SuggestUserItem from './SuggestUserItem/SuggestUserItem';

const userList = [
    {
        "name": "test1",
        "account": "test1",
        "isFollowing": true
    },
    {
        "name": "test2",
        "account": "test2",
        "isFollowing": false
    },
    {
        "name": "test3",
        "account": "test3",
        "isFollowing": false
    },
    {
        "name": "test4",
        "account": "test4",
        "isFollowing": false
    },
    {
        "name": "test5",
        "account": "test5",
        "isFollowing": false
    },
    {
        "name": "test6",
        "account": "test6",
        "isFollowing": false
    },
    {
        "name": "test7",
        "account": "test7",
        "isFollowing": false
    },
    {
        "name": "test8",
        "account": "test8",
        "isFollowing": false
    },
    {
        "name": "test9",
        "account": "test9",
        "isFollowing": false
    },
    {
        "name": "test10",
        "account": "test10",
        "isFollowing": false
    },
]

function SuggestUser() {
    return <div className={style.SuggestUser}>
        <h2>Popular</h2>
        {userList.map((user) =>
            <SuggestUserItem user={user} />
        )}
    </div>
}

export default SuggestUser;