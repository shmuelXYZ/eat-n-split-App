import { Friend } from "./Friend";

export function ListOfFriends({ friends, onCurFriend, curFreind }) {
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
