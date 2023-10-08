import React, { useState } from "react";

let firstRender = true;
let value1: string;
let value2: string;
let setValue1: (value: string) => void;
let setValue2: (value: string) => void;

export const OrderOfHooks = () => {
  console.log("----- OrderOfHooks -----");

  console.log("Before hooks:", { value1, value2, setValue1, setValue2 });

  if (firstRender) {
    [value1, setValue1] = useState("initValue1");
    firstRender = false;
    console.log("First render:", { value1, value2, setValue1, setValue2 });
  } else {
    [value2, setValue2] = useState("initValue2");
    console.log("Other render:", { value1, value2, setValue1, setValue2 });
  }

  console.log("After hooks:", { value1, value2, setValue1, setValue2 });
  // const [value, setValue] = useState("value")

  return (
    <>
      <p>
        <button
          onClick={() => {
            console.log("Execute setValue1");
            setValue1("newValue1");
          }}
        >
          setValue1
        </button>
        <>{`Value1 is: ${value1}`}</>
      </p>
      {/*<p></p>*/}
      <p>
        <button
          onClick={() => {
            console.log("Execute setValue2");
            setValue2("newValue2");
          }}
        >
          setValue2
        </button>
        <>{`Value2 is: ${value2}`}</>
      </p>
      {/*<p>*/}
      {/*    <button onClick={() => {*/}
      {/*        console.log("Call setValue");*/}
      {/*        setValue("newValue")*/}
      {/*    }}>setValue*/}
      {/*    </button>*/}
      {/*    <>{`Value is: ${value}`}</>*/}
      {/*</p>*/}
    </>
  );
};
