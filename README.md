# Playground for React

This project is a small playground for me to experiment and better understand the internals of React.

## Getting started

```
# Install dependencies
npm install

# Run the application
npm run start

# Go to http://localhost:1234 in your web browser
```

## How to set up a minimal playground with React, JS and Parcel

References to set up the minimal project:

- [Getting started with a minimal project (React, JS, Parcel)](https://levelup.gitconnected.com/how-to-create-a-minimal-react-and-parcel-app-in-5-steps-2806fa09a371)
- [With React 18, use `createRoot` instead of ReactDOM.render which is not supported anymore](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis)

In brief, for a minimal setup with React, JS and Parcel, we need to
install `@babel/preset-env`, `@babel/preset-react`, `parcel-bundler` and create an HTML file (`index.html`) file
sourcing an entry file (`src/index.js`), itself rendering the React component implemented in `src/App.js`.

- [Replace JS with TS](https://adrianhall.github.io/javascript/react/2020/03/29/parcel-typescript-react/)

In brief, we need to add dependencies `typescript`, `@types/react`, `@types/react-dom`, as well as a `tsconfig.json`
file, and update the `js` extensions to `tsx` extensions.

## Experiments

### Experiment 1: Understand the internals of React hooks (and why their order matters)

This set of experiments allows to understand the internals of React hooks.
In particular, these shed light on the fact that hooks are stored as an array in the global state, which is why the
order in which they are called at each render must stay the same.

#### Case A: Why the order of hooks rule matters (`experiments/OrderOfHooks.tsx`)

_What happens:_

- First render:
    - `useState1` is executed => `value1` gets initialized to `initValue1` and the setter `setValue1` exists
    - `useState2` is not executed => `value2` is undefined, and the setter `setValue2` does not exist
- Second render:
    - If click on `setValue2` button => error because `setValue2` does not exist
    - If click on `setValue1` button => `value2` (and not `value1` !!) gets updated to `newValue1`
- Third render:
    - `value2` gets updated to the value provided by `setValue1` or `setValue2` (depending on which button gets clicked)

_Why this happens:_

React stores the states in a global state, which in practice is an array of all the stored states.
At each re-render, the hooks are indexed in the order in which they were called and the order of states in the global
state array is assumed to correspond to these hooks
=> **the state values are extracted from that global state in that order**.

Here, at the first render, since only the hook `useState1` is called, `value1` is stored at index 0 in the global state.
When we click on `setValue1`, the value in the global state array (at index 0) gets updated to `newValue1` and the
component gets re-rendered (because the state has been updated).
During the new re-render, since only the hook `useState2` is called, it is assumed that the value at index 0
in the global state corresponds to `value2`. Hence, it is `value2` that gets updated, but not `value1`.
At all the following re-renders, the same logic applies, which is why it is always `value2` that gets updated, no matter
if we execute `setValue2` or `setValue1`.

[This article](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e) is a good reference
explaining this mental model (NB: Dan Abramov "overreacted" blog refers to this article as a good description of what
happens)

_**Note to self:**_
_When I implemented the `useState` function in
my [Recode React project](https://github.com/MaudGautier/custom-React-UI-library/tree/master), I opted for a global
state stored as an object, with keys ("slug") being passed by the hook to differentiate between different stored values,
thus avoiding that problem:_

```ts
let state = {};

export function useState<State>(initialValue, slug): [getState: () => State, updateState: (t: State) => void] {
    const getState = <State>(): State => {
        return state[slug];
    };
    if (!getState()) {
        state[slug] = initialValue;
    }

    const updateState = <State>(updatedState: State): void => {
        state[slug] = updatedState;
        render();
    };

    return [getState, updateState];
}
```

_In [his article explaining why hooks rely on call order](https://overreacted.io/why-do-hooks-rely-on-call-order/), Dan
Abramov explains why this is a solution they considered but that they abandoned (because of the risk of name/slug
collision that this approach implies), along with many other design solutions.
As a result, **the React team opted for storing the global state in an array, which is imperfect because it relies on
the order of calls, but is the least imperfect solution to the problem**._

#### Case B: Why using a custom hook selecting different hooks at different re-renders may be a problem (`experiments/OrderOfHooksWithHookSelection.tsx`)

_⚠️ This situation is unrealistic in the real world: the implementation was just intended to uncover what kinds fo
problems
we may have._

_What happens:_

- At first render, value is initialized to `initValue1`.
- At second render (after clicking on `setValue`), the value is updated to `newValue1`.
- At third render, the value is updated to `newValue2` and remains with this value at any subsequent re-render.

_Why this happens:_

In this example, there is only one `value` that is displayed, but it is updated either by `useState1` or by `useState2`.
At second render, it is `useState2` that is correctly executed, but since (very artificially, and absolutely not
realistically), we get the `newValue` from `useSelectHook`, the `newValue` corresponds to what was decided at the
previous execution of `useSelectHook`, hence the delay by 1 re-render.

_**NB:**
This implementation was intended to show how it can be a problem, but it's something that probably no one would
ever do (it doesn't make much sense to decide what the new value is going to be in the custom hook)._

#### Case C: Why using a custom hook selecting different hooks at different re-renders may not be a problem (`experiments/OrderOfHooksWithHookSelectionAndInputtedValue.tsx`)

_What happens:_

- At first render, value is initialized to `initValue1`.
- At second render, value corresponds to whatever was submitted in the input field.

_Why this happens:_

In this example, there is only one `value` that is displayed, but it is updated either by `useState1` or by `useState2`.
Since it is always the same value that gets updated by either one of the hooks (selected by `useSelectHook`), there
should be no problem because, in the array of the global state, index 0 always contains `value` at every render.

More generally, if the order of state values stored in the global state array remains the same at every re-render,
there should not be any inconsistency between re-renders.

#### Conclusion

The order in which hooks are called matters if different values are represented by the different hooks (and thus the
order in the global state array changes or represents different values at different re-renders).

However, in a case where one state value represented is updated by different hooks (that get selected in a custom hook),
– but where the order of the state values in the global state array remains the same, –
no problem should occur.

**All in all, what matters is to have the _state values_ always stored in the same order in the global state array.**
Given that _the order of state values is inferred based on the order of hook calls_, the React team says we must keep
the same order of hook calls at every re-render, but **this is a simplification**: if two distinct hooks can be used to
set the same state object, then there is no problem.

### Experiment 2 (with Laurent): Define React `useState`'s initial values in parent component

_Observations:_

- At first render:
    - Child component receives value `initValue` from parent component
    - Value `initValue` is used to initialise the state
    - The value displayed in the child component is `initValue`
- At second render (after the initial value is updated in the parent component, following click on button):
    - Child component receives new value `newInitValue` from parent component
    - Since the state has already been initialised, this new value is not used
    - As a consequence, the value displayed in the child component remains `initValue`

_Conclusion:_

If an initial value comes from a parent component and is modified after the first render of the application, it is not
used => using this pattern is pointless.

