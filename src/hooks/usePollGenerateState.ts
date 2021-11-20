import { useReducer } from 'react';
import { DispatchAction, DispatchActionChoicePayload, PollGeneratorInput } from '@/types/common';

const initialState: PollGeneratorInput = {
  title: 'WHAT WOULD YOU PREFER?',
  choices: {
    like: {
      checked: true,
      text: 'WORK FROM HOME',
    },
    celebrate: {
      checked: true,
      text: 'OFFICE',
    },
    love: {
      checked: true,
      text: 'BOTH',
    },
    insightful: {
      checked: true,
      text: 'NONE',
    },
    curious: {
      checked: true,
      text: "I'M JUST CURIOUS",
    },
  },
};

const reducer = (state: PollGeneratorInput, action: DispatchAction): PollGeneratorInput => {
  const { type } = action;

  switch (type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'choice':
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
      throw new Error('Unknown dispatch action type!');
  }
};

export const usePollGeneratorState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateTitle = (value: string) => {
    dispatch({ type: 'title', payload: value });
  };

  const updateChoice = (value: DispatchActionChoicePayload) => {
    dispatch({ type: 'choice', payload: value });
  };

  return {
    generatorState: state,
    updateChoice,
    updateTitle,
  };
};
