import React from "react";
import { OrderOfHooks } from "./experiments/OrderOfHooks";
import { OrderOfHooksWithHookSelection } from "./experiments/OrderOfHooksWithHookSelection";
import { Box } from "./components/Box";
import { OrderOfHooksWithHookSelectionAndInputtedValue } from "./experiments/OderOfHooksWithHookSelectionAndInputtedValue";
import { DefineStateInitValueInParentComponent } from "./experiments/DefineStateInitValueInParentComponent";

const App = () => (
  <>
    <h1>React playground</h1>
    <Box title="Experiment 1: Understand the internals of hooks (array in the global state => order matters)">
      <Box
        title="Case A: Why the 'order of hooks' rule matters 🤯"
        level="case"
      >
        <OrderOfHooks />
      </Box>
      <Box
        title="Case B: Why using a custom hook to select different hooks at re-renders *may* be a problem (⚠️ Not realistic)"
        level="case"
      >
        <OrderOfHooksWithHookSelection />
      </Box>
      <Box
        title="Case C: Why using a custom hook to select different hooks at re-renders *should not* be a problem (✅ Realistic)"
        level="case"
      >
        <OrderOfHooksWithHookSelectionAndInputtedValue />
      </Box>
    </Box>
    <Box title="Experiment 2: Understand why it is pointless to update an initial value">
      <DefineStateInitValueInParentComponent />
    </Box>
  </>
);

export default App;
