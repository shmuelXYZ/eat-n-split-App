import { useState } from "react";
import { Button } from "./Button";
// import { Friend } from "./Friend";

// Function component to handle splitting a bill with a friend.
// Props: curFreind - the current friend, onSplitBill - callback function to handle bill splitting.
export function FormSplitBill({ curFreind, onSplitBill }) {
  // useState hooks to manage bill, user's payment, and who is paying.
  const [bill, steBill] = useState("");
  const [yourPay, setYourPay] = useState("");
  const [whoPay, setWhoPay] = useState("you");

  // friendExpens calculates the amount the friend should pay, based on the total bill and your payment.
  const friendExpens = bill && bill - yourPay;

  // handelSubmit function prevents default form submission and checks if bill and yourPay values are present. Calls onSplitBill with calculated value.
  function handelSubmit(e) {
    e.preventDefault();
    if (!bill || !yourPay) return;
    onSplitBill(whoPay === "you" ? friendExpens : friendExpens - bill);
  }

  // Return JSX form to input bill value, your expense, and who is paying, and then submit the form.
  return (
    <form className="form-split-bill" onSubmit={handelSubmit}>
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
