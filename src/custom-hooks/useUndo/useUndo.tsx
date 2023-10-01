import { useReducer, useCallback } from 'react';

enum ActionType {
  UNDO = 'UNDO',
  REDO = 'REDO',
  SET = 'SET',
}

interface UndoAction {
  type: ActionType.UNDO;
}

interface RedoAction {
  type: ActionType.REDO;
}

interface SetAction<T> {
  type: ActionType.SET;
  present: T;
}

type Action<T> = UndoAction | RedoAction | SetAction<T>;

// Define state interface
interface State<T> {
  past: T[];
  present: T;
  future: T[];
}

// Define initial state
const initialState = {
  past: [],
  present: null as any, // Replace 'any' with your initial state type
  future: [],
};

// Define the reducer function
const undoReducer = <T,>(state: State<T>, action: Action<T>): State<T> => {
  const { past, present, future } = state;

  switch (action.type) {
    case ActionType.UNDO: {
      if (past.length === 0) {
        return state; // No past states to undo to; return the current state.
      }

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case ActionType.REDO: {
      if (future.length === 0) {
        return state; // No future states to redo to; return the current state.
      }

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case ActionType.SET: {
      const { present: newPresent } = action;

      if (newPresent === present) {
        return state; // No change in state; return the current state.
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    default:
      return state;
  }
};

function useUndo<T>(initialPresent: T) {
  const [state, dispatch] = useReducer(undoReducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undoAction = useCallback(() => {
    if (canUndo) {
      dispatch({ type: ActionType.UNDO });
    }
  }, [canUndo]);

  const redoAction = useCallback(() => {
    if (canRedo) {
      dispatch({ type: ActionType.REDO });
    }
  }, [canRedo]);

  const setState = useCallback((newPresent: T) => {
    dispatch({ type: ActionType.SET, present: newPresent });
  }, []);

  return {
    state: state.present as T,
    canUndo,
    canRedo,
    undoAction,
    redoAction,
    setState,
  };
}

export default useUndo;
