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
  return (
    <div className="app">
      <div className="sidebar">
        <ListOfFriends />
      </div>
    </div>
  );
};

export default App;

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
      <button className="button">Select</button>
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
