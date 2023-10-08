import React from "react";
import { OrderOfHooks } from "./experiments/OrderOfHooks";
import { OrderOfHooksWithHookSelection } from "./experiments/OrderOfHooksWithHookSelection";
import { Box } from "./components/Box";
import { OrderOfHooksWithHookSelectionAndInputtedValue } from "./experiments/OderOfHooksWithHookSelectionAndInputtedValue";

const App = () => (
  <>
    <h1>React playground</h1>
    <Box title="Case 1: why the 'order of hooks' rule matters 🤯">
      <OrderOfHooks />
    </Box>
    <Box title="Case 2: why using a custom hook to select different hooks at re-renders *may* be a problem (⚠️ Not realistic)">
      <OrderOfHooksWithHookSelection />
    </Box>
    <Box title="Case 3: why using a custom hook to select different hooks at re-renders *should not* be a problem (✅ Realistic)">
      <OrderOfHooksWithHookSelectionAndInputtedValue />
    </Box>
  </>
);

export default App;
