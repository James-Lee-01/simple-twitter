import style from './SuggestUser.module.scss';
import SuggestUserItem from './SuggestUserItem/SuggestUserItem';

const userList = [
  {
    name: "test1",
    account: "test1",
    isFollowed: true,
  },
  {
    name: "test2",
    account: "test2",
    isFollowed: false,
  },
  {
    name: "test3",
    account: "test3",
    isFollowed: false,
  },
  {
    name: "test4",
    account: "test4",
    isFollowed: false,
  },
  {
    name: "test5",
    account: "test5",
    isFollowed: false,
  },
  {
    name: "test6",
    account: "test6",
    isFollowed: false,
  },
  {
    name: "test7",
    account: "test7",
    isFollowed: false,
  },
  {
    name: "test8",
    account: "test8",
    isFollowed: false,
  },
  {
    name: "test9",
    account: "test9",
    isFollowed: false,
  },
  {
    name: "test10",
    account: "test10",
    isFollowed: false,
  },
];

function SuggestUser() {
    return <div className={style.suggestUser}>
        <h2>Popular</h2>
        {userList.map((user) =>
            <SuggestUserItem user={user} />
        )}
    </div>
}

export default SuggestUser;