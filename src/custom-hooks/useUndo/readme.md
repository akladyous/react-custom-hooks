# use-undo

`use-undo` is a React custom hook that allows you to easily implement undo and redo functionality in
your React applications.

## Installation

To install `use-undo`, you can use npm or yarn:

```bash
npm install use-undo
# or
yarn add use-undo
```

## Usage

Here's how you can use `use-undo` in your React components:

```javascript
import React from 'react';
import useUndo from 'use-undo';

function MyComponent() {
  const { state, canUndo, canRedo, undoAction, redoAction, setState, resetState } =
    useUndo(initialState);

  const handleUndo = () => {
    undoAction();
  };

  const handleRedo = () => {
    redoAction();
  };

  const handleSetState = (newState) => {
    setState(newState);
  };

  const handleResetState = (initialState) => {
    resetState(initialState);
  };

  return <div>{/* Your component content here */}</div>;
}

export default MyComponent;
```

## API

### `useUndo(initialPresent: T): UndoState<T>`

- `initialPresent` (T): The initial state value.

Returns an object with the following properties:

- `state` (T): The current state.
- `canUndo` (boolean): Indicates whether an undo action is possible.
- `canRedo` (boolean): Indicates whether a redo action is possible.
- `undoAction()`: A function to perform an undo action.
- `redoAction()`: A function to perform a redo action.
- `setState(newState: T)`: A function to set the state to a new value.
- `resetState(initialState: T)`: A function to reset the state to the initial value.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

You can copy and paste this content into your README.md file for your package. Make sure to replace `MyComponent` and `initialState` with your actual component and initial state. You can also provide more details and usage examples in your README file as needed.
```
