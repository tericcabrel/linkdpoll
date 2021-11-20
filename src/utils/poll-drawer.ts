import { GenerateReactionConfigsArgs, PollGeneratorInput, Reaction, ReactionConfig } from '@/types/common';

const formatChoicesForDisplay = (choices: PollGeneratorInput['choices']) => {
  const keys = Object.keys(choices) as Reaction[];

  return keys
    .filter((key) => choices[key].checked)
    .map((key) => ({
      ...choices[key],
      reaction: key,
    }));
};

const getContext = (canvas: HTMLCanvasElement | null) => {
  const context = canvas?.getContext('2d');

  if (!context) {
    throw new Error(`Canvas not initialized for: ${canvas?.id}`);
  }

  return context;
};

export const drawTitle = (context: CanvasRenderingContext2D, text: string) => {
  context.clearRect(0, 0, 600, 50);

  context.font = '36px arial';
  const textMetric = context.measureText(text);

  const xPosition = 600 / 2 - textMetric.width / 2;

  context.fillText(text, xPosition, 35, 600);
};

const splitTextToLines = (textToSplit: string, context: CanvasRenderingContext2D): string[] => {
  const textSegments = [];
  const canvasWidth = context.canvas.width;

  let textMetric = context.measureText(textToSplit);

  if (textMetric.width <= canvasWidth) {
    return [textToSplit];
  } else {
    const textFit = textToSplit.split(' ');
    let currentText = '';
    let nextWordInText;

    do {
      nextWordInText = textFit.shift();
      currentText += currentText.length === 0 ? nextWordInText : ` ${nextWordInText}`;

      textMetric = context.measureText(currentText);
    } while (context.canvas.width > textMetric.width);

    const currentTextWords = currentText.split(' ');
    currentTextWords.pop();

    textSegments.push(currentTextWords.join(' '));

    return textSegments.concat(splitTextToLines([nextWordInText, ...textFit].join(' '), context));
  }
};

const drawLikeTitle = (context: CanvasRenderingContext2D, text: string) => {
  context.clearRect(0, 0, 120, 340);

  context.font = '18px arial';
  const textMetrics = context.measureText(text);

  const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  const textArray = splitTextToLines(text, context);

  for (let i = 0; i < 2; i++) {
    const textToDisplay = textArray[i];

    if (!textToDisplay) {
      continue;
    }

    const textMetric = context.measureText(textToDisplay);
    const xPos = 120 / 2 - textMetric.width / 2;

    const height = 30 + (i === 0 ? 0 : 5) + textHeight * i;

    context.fillText(textToDisplay, xPos, height, 120);
  }
};

const drawReaction = (context: CanvasRenderingContext2D, text: string, color: string, pictureURL: string) => {
  context.fillStyle = '#000';
  drawLikeTitle(context, text);
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(45, 90);
  context.lineTo(60, 60);
  context.lineTo(75, 90);
  context.fill();
  context.fillRect(58.5, 90, 3, 90);
  const image = new Image(50, 50);
  image.addEventListener(
    'load',
    () => {
      context.drawImage(image, 35, 190);
    },
    false,
  );
  image.src = pictureURL;
};

const generateReactionConfigs = ({
  likeContext,
  celebrateContext,
  loveContext,
  insightfulContext,
  curiousContext,
}: GenerateReactionConfigsArgs): Record<Reaction, ReactionConfig> => {
  return {
    like: {
      color: '#3a83ba',
      context: likeContext,
    },
    celebrate: {
      color: '#6dae4f',
      context: celebrateContext,
    },
    love: {
      color: '#d07453',
      context: loveContext,
    },
    insightful: {
      color: '#ecbc6d',
      context: insightfulContext,
    },
    curious: {
      color: '#deb8dc',
      context: curiousContext,
    },
  };
};

export { formatChoicesForDisplay, getContext, drawLikeTitle, drawReaction, generateReactionConfigs };
