import { Button } from "./Button";

export function Friend({ name, image, balance, onCurFriend, curFreind }) {
  const isSelected = curFreind === name;
  return (
    <li className={isSelected ? "selected" : undefined}>
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
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
