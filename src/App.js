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

  function handelShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ListOfFriends />
        {showAddFriend ? <FormAddFreind /> : ""}
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

function ListOfFriends() {
  return (
    <ul>
      {initialFriends.map((friend) => (
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

function FormAddFreind() {
  return (
    <form className="form-add-friend">
      <label>🧍‍♂️ Friend name </label>
      <input type="text"></input>
      <label>📷 Image URL</label>
      <input type="text"></input>
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
