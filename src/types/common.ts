export type Reaction = 'like' | 'celebrate' | 'love' | 'insightful' | 'curious';

export type PollGeneratorChoiceInfo = {
  text: string;
  checked: boolean;
};

export type PollGeneratorInput = {
  title: string;
  choices: Record<Reaction, PollGeneratorChoiceInfo>;
};

type ActionType = 'title' | 'choice';

type Action<Type extends ActionType, Payload> = {
  type: Type;
  payload: Payload;
};

export type DispatchActionChoicePayload = PollGeneratorChoiceInfo & {
  reaction: Reaction;
};

type DispatchActionTitle = Action<'title', string>;
type DispatchActionChoice = Action<'choice', DispatchActionChoicePayload>;

export type DispatchAction = DispatchActionTitle | DispatchActionChoice;

export type PictureSize = {
  mini: string;
  normal: string;
};

export type ReactionConfig = {
  color: string;
  context: CanvasRenderingContext2D;
};

export type GenerateReactionConfigsArgs = {
  likeContext: CanvasRenderingContext2D;
  celebrateContext: CanvasRenderingContext2D;
  loveContext: CanvasRenderingContext2D;
  insightfulContext: CanvasRenderingContext2D;
  curiousContext: CanvasRenderingContext2D;
};

export type EnhancedChoice = PollGeneratorChoiceInfo & { reaction: Reaction };
