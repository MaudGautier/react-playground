import React, { useState } from "react";

let firstRender = true;

type Value = string;
type SetValue = (value: Value) => void;

type UseSelectHook = {
  newValue: string;
  useStateSelected: () => [Value, SetValue];
};

export const useSelectHook = (firstRender: boolean): UseSelectHook => {
  const useState1 = (): [Value, SetValue] => {
    console.log("Executing useState1");
    const [value1, setValue1] = useState("initValue1");

    return [value1, setValue1];
  };

  const useState2 = (): [Value, SetValue] => {
    console.log("Executing useState2");
    const [value2, setValue2] = useState("initValue2");

    return [value2, setValue2];
  };

  if (firstRender) {
    return { useStateSelected: useState1, newValue: "newValue1" };
  } else {
    return { useStateSelected: useState2, newValue: "newValue2" };
  }
};

export const OrderOfHooksWithHookSelection = () => {
  console.log("----- OrderOfHooksWithHookSelection -----");

  const { useStateSelected, newValue } = useSelectHook(firstRender);

  const [value, setValue] = useStateSelected();
  console.log("After hooks:", { value, newValue, firstRender });
  firstRender = false;

  return (
    <>
      <button onClick={() => setValue(newValue)}>{"setValue"}</button>
      <p>{`Value is: ${value}`}</p>
    </>
  );
};
