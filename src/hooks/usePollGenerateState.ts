import { useReducer } from 'react';
import {
  DispatchAction,
  DispatchActionChoicePayload,
  PollGeneratorInput,
} from '@/types/common';

const initialState: PollGeneratorInput = {
  title: ``,
  choices: {
    like: {
      checked: false,
      text: ``,
    },
    celebrate: {
      checked: false,
      text: ``,
    },
    love: {
      checked: false,
      text: ``,
    },
    insightful: {
      checked: false,
      text: ``,
    },
    curious: {
      checked: false,
      text: ``,
    },
  },
};

const reducer = (
  state: PollGeneratorInput,
  action: DispatchAction,
): PollGeneratorInput => {
  const { type } = action;

  switch (type) {
    case `title`:
      return { ...state, title: action.payload };
    case `choice`:
      return {
        ...state,
        choices: {
          ...state.choices,
          [action.payload.reaction]: {
            text: action.payload.text,
            checked: action.payload.checked,
          },
        },
      };
    default:
      throw new Error(`Unknown dispatch action type!`);
  }
};

export const usePollGeneratorState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateTitle = (value: string) => {
    dispatch({ type: `title`, payload: value });
  };

  const updateChoice = (value: DispatchActionChoicePayload) => {
    dispatch({ type: `choice`, payload: value });
  };

  return {
    generatorState: state,
    updateChoice,
    updateTitle,
  };
};
