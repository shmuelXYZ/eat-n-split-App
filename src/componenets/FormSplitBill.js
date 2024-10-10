import { useState } from "react";
import { Button } from "./Button";
// import { Friend } from "./Friend";

export function FormSplitBill({ curFreind, onSplitBill }) {
  const [bill, steBill] = useState("");
  const [yourPay, setYourPay] = useState("");
  const [whoPay, setWhoPay] = useState("you");
  const friendExpens = bill && bill - yourPay;

  function handelSubmit(e) {
    e.preventDefault();
    if (!bill || !yourPay) return;
    onSplitBill(whoPay === "you" ? friendExpens : friendExpens - bill);
  }

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
