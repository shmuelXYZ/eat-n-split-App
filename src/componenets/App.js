import { useState } from "react";
import { Button } from "./Button";
import { ListOfFriends } from "./ListOfFriends";
import { FormAddFreind } from "./FormAddFreind";
import { FormSplitBill } from "./FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [curFreind, setCurFriend] = useState(null);

  if (showAddFriend && curFreind) {
    handelShowAddFriend();
  }

  function handelShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  function handelAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    handelShowAddFriend();
  }

  function handelCurFriend(friend) {
    setCurFriend(friend === curFreind ? null : friend);
    // handelShowAddFriend(false);
  }

  function handelSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.name === curFreind
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setCurFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ListOfFriends
          friends={friends}
          onCurFriend={handelCurFriend}
          curFreind={curFreind}
        />

        {showAddFriend ? <FormAddFreind onAddFriend={handelAddFriend} /> : ""}

        <Button onClick={handelShowAddFriend}>
          {showAddFriend ? "close" : "add friend"}
        </Button>
      </div>
      {curFreind && (
        <FormSplitBill curFreind={curFreind} onSplitBill={handelSplitBill} />
      )}
    </div>
  );
};

export default App;
