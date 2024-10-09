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

  function handelShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  function handelAddFriend(newFriend) {
    return setFriends((friends) => [...friends, newFriend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ListOfFriends friends={friends} />
        {showAddFriend ? <FormAddFreind onAddFriend={handelAddFriend} /> : ""}
        <Button onClick={handelShowAddFriend}>
          {showAddFriend ? "close" : "add friend"}
        </Button>
      </div>
      <FormSplitBill />
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

function Friend({ name, image, balance }) {
  return (
    <li>
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
      <Button>Selcet</Button>
    </li>
  );
}

function ListOfFriends({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          image={friend.image}
          name={friend.name}
          balance={friend.balance}
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>split a bill with X</h2>
      <label>💵 Bill value </label>
      <input type="text"></input>
      <label>🧍 You pay ... </label>
      <input type="text"></input>
      <label>🧍‍♂️ Your friend pay ... </label>
      <input type="text" disabled></input>
      <label>🤑 Who is paying?</label>
      <select>
        <option value="you">you</option>
        <option value="friend">friend</option>
      </select>
      <Button>split</Button>
    </form>
  );
}
