import { useReducer, useCallback } from 'react';

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

type ActionsList = 'UNDO' | 'REDO' | 'SET' | 'RESET';
type ActionPayload<T> = { value: T };
type ACTION<T> = { type: ActionsList; payload: ActionPayload<T> };
interface Actions<T> {
  Set: () => void;
  undo: () => void;
  redo: () => void;
  reset: (initialState: T) => void;
  canUndo: boolean;
  canRedo: boolean;
}

const undoReducer = <T,>(state: State<T>, action: ACTION<T>) => {
  const { past, present, future } = state;
  switch (action.type) {
    case 'SET': {
      const { value: newPresent } = action.payload;

      if (newPresent === present) {
        return state; // No change in state; return the current state.
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case 'UNDO': {
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
    case 'REDO': {
      if (future.length === 0) {
        return state;
      }
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case 'RESET': {
      return {
        past: [],
        present: action.payload.value,
        future: [],
      };
    }
    default:
      return state;
  }
};

function useUndo<T>(initialPresent: T): [State<T>, Actions<T>] {
  const [state, dispatch] = useReducer(undoReducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undoAction = useCallback(() => {
    if (canUndo) {
      dispatch({});
    }
  }, [canUndo]);

  const redoAction = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo]);

  const setState = useCallback((newPresent: T) => {
    dispatch({ type: ActionType.SET, payload: { value: newPresent } });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: ActionType.RESET, payload: { value: initialPresent } });
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
