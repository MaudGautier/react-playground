import React, { useState } from "react";

export const DefineStateInitValueInParentComponent = () => {
  const [initValue, setInitValue] = useState("initValue");

  return (
    <>
      <button onClick={() => setInitValue("newInitValue")}>
        Change init value
      </button>
      <ChildComponentWithInitValueAsProps initValue={initValue} />
    </>
  );
};

const ChildComponentWithInitValueAsProps = ({
  initValue,
}: {
  initValue: string;
}) => {
  const [value, setValue] = useState(initValue);
  console.log({
    "initValue passed from parent": initValue,
    "value in the child component": value,
  });

  return (
    <>
      <button onClick={() => setValue("newValue")}>change value</button>
      <p>{`Value is: ${value}`}</p>
    </>
  );
};
