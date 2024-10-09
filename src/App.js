import { useState } from "react";

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
  // if (showAddFriend && curFreind) {
  //   handelShowAddFriend();
  // }

  function handelShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  function handelAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    handelShowAddFriend();
  }

  function handelCurFriend(friend) {
    setCurFriend(friend === curFreind ? null : friend);
    handelShowAddFriend();
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
      {curFreind && <FormSplitBill curFreind={curFreind} />}
    </div>
  );
};

export default App;

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function Friend({ name, image, balance, onCurFriend, curFreind }) {
  const isSelcted = curFreind === name;
  return (
    <li className={isSelcted && "selected"}>
      <img src={image} alt=""></img>
      <h3>{name}</h3>
      {balance === 0 ? (
        <p>you and {name} are even</p>
      ) : balance < 0 ? (
        <p className="red">
          you owe to {name} {Math.abs(balance)}$
        </p>
      ) : (
        <p className="green">
          {name} owe you {balance}$
        </p>
      )}
      <Button onClick={() => onCurFriend(name)}>
        {isSelcted ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function ListOfFriends({ friends, onCurFriend, curFreind }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          image={friend.image}
          name={friend.name}
          balance={friend.balance}
          onCurFriend={onCurFriend}
          curFreind={curFreind}
        />
      ))}
    </ul>
  );
}

function FormAddFreind({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function hanedlSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={hanedlSubmit}>
      <label>🧍‍♂️ Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>📷 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>add</Button>
    </form>
  );
}

function FormSplitBill({ curFreind }) {
  const [bill, steBill] = useState("");
  const [yourPay, setYourPay] = useState("");
  const [whoPay, setWhoPay] = useState("you");
  const friendExpens = bill && bill - yourPay;
  return (
    <form className="form-split-bill">
      <h2>split a bill with {curFreind}</h2>

      <label>💵 Bill value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => steBill(+e.target.value)}
      ></input>

      <label>🧍 You expend ... </label>
      <input
        type="text"
        value={yourPay}
        onChange={(e) =>
          setYourPay(+e.target.value > bill ? yourPay : +e.target.value)
        }
      ></input>

      <label>🧍‍♂️ {curFreind} expend ... </label>
      <input type="text" disabled value={friendExpens}></input>

      <label>🤑 Who is paying?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="you">you</option>
        <option value="friend">{curFreind}</option>
      </select>
      <Button>split</Button>
    </form>
  );
}
