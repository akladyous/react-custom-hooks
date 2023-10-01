import { useReducer, useCallback } from 'react';

interface Actions<T> {
  Set: () => void;
  undo: () => void;
  redo: () => void;
  reset: (initialState: T) => void;
  canUndo: boolean;
  canRedo: boolean;
}

enum ActionType {
  UNDO = 'UNDO',
  REDO = 'REDO',
  SET = 'SET',
  RESET = 'RESET',
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
interface ResetAction<T> {
  type: ActionType.RESET;
  initialState: T;
}
type Action<T> = UndoAction | RedoAction | SetAction<T> | ResetAction<T>;

interface State<T> {
  past: T[];
  present: T;
  future: T[];
}

const initialState = {
  past: [],
  present: null,
  future: [],
};
type ACTION = {};

const undoReducer = <T,>(state: State<T>, action: Action<T>): State<T> => {
  const { past, present, future } = state;

  switch (action.type) {
    case ActionType.UNDO: {
      if (past.length === 0) {
        return state;
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

    case ActionType.RESET: {
      return {
        past: [],
        present: action.initialState,
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

  const resetState = useCallback(() => {
    dispatch({ type: ActionType.RESET, initialState: initialPresent });
  }, []);

  return {
    state: state.present as T,

    past: state.past as T[],
    present: state.present,
    future: state.future as T[],

    canUndo,
    canRedo,
    undoAction,
    redoAction,
    setState,
    resetState,
  };
}
export default useUndo;
