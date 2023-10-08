import React, { useState } from "react";
import { useSelectHook } from "./OrderOfHooksWithHookSelection";

let firstRender = true;

export const OrderOfHooksWithHookSelectionAndInputtedValue = () => {
  console.log("----- OrderOfHooksWithHookSelectionAndInputtedValue -----");

  const { useStateSelected } = useSelectHook(firstRender);
  const [value, setValue] = useStateSelected();
  firstRender = false;

  const [input, setInput] = useState("");
  const handleChange = (event: { target: { value: string } }) =>
    setInput(event.target.value);
  const handleClick = () => setValue(input);

  return (
    <>
      <input name="inputtedValue" onChange={handleChange}></input>
      <button onClick={handleClick}>Submit</button>
      <p>{`Value is: ${value}`}</p>
    </>
  );
};
