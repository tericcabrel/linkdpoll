import { useEffect, useRef } from 'react';
import { PollGeneratorInput } from '@/types/common';
import styles from '@/styles/canvas.module.css';
import {
  drawReaction,
  drawTitle,
  formatChoicesForDisplay,
  generateReactionConfigs,
  getContext,
} from '@/utils/poll-drawer';
import { REACTION_PICTURE_PATH_MAPS } from '@/utils/constants';

type Props = {
  input: PollGeneratorInput;
};

const PollDrawer = ({ input }: Props) => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const titleCanvasRef = useRef<HTMLCanvasElement>(null);
  const likeCanvasRef = useRef<HTMLCanvasElement>(null);
  const celebrateCanvasRef = useRef<HTMLCanvasElement>(null);
  const loveCanvasRef = useRef<HTMLCanvasElement>(null);
  const insightfulCanvasRef = useRef<HTMLCanvasElement>(null);
  const curiousCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mainContext = getContext(mainCanvasRef.current);
    const titleContext = getContext(titleCanvasRef.current);
    const likeContext = getContext(likeCanvasRef.current);
    const celebrateContext = getContext(celebrateCanvasRef.current);
    const loveContext = getContext(loveCanvasRef.current);
    const insightfulContext = getContext(insightfulCanvasRef.current);
    const curiousContext = getContext(curiousCanvasRef.current);

    const selectedChoices = formatChoicesForDisplay(input.choices);

    const reactionConfigs = generateReactionConfigs({
      likeContext,
      celebrateContext,
      loveContext,
      insightfulContext,
      curiousContext,
    });

    drawTitle(titleContext, input.title || 'Poll Title');

    for (const choice of selectedChoices) {
      const config = reactionConfigs[choice.reaction];

      drawReaction(config.context, choice.text, config.color, REACTION_PICTURE_PATH_MAPS[choice.reaction].mini);
    }

    // mainContext.clearRect(0, 0, 640, 360);
    mainContext.fillStyle = '#fff';
    mainContext.fillRect(0, 0, 640, 360);
    mainContext.drawImage(titleContext.canvas, 20, 20, 600, 50);
    setTimeout(() => {
      const xPosition = 640 / 2 - (120 * selectedChoices.length) / 2;

      selectedChoices.forEach((choice, index) => {
        const config = reactionConfigs[choice.reaction];

        const x = xPosition + 120 * index;
        mainContext.drawImage(config.context.canvas, x, 90, 120, 340);
      });
    }, 400);
  }, [input]);

  return (
    <div>
      <canvas id="poll" width="640" height="360" className={styles.canvas} ref={mainCanvasRef} />
      <canvas id="poll-title" width="600" height="50" className="sub-draw" ref={titleCanvasRef} />
      <canvas id="like-reaction" width="120" height="340" className="sub-draw" ref={likeCanvasRef} />
      <canvas id="celebrate-reaction" width="120" height="340" className="sub-draw" ref={celebrateCanvasRef} />
      <canvas id="love-reaction" width="120" height="340" className="sub-draw" ref={loveCanvasRef} />
      <canvas id="insightful-reaction" width="120" height="340" className="sub-draw" ref={insightfulCanvasRef} />
      <canvas id="curious-reaction" width="120" height="340" className="sub-draw" ref={curiousCanvasRef} />
    </div>
  );
};

export { PollDrawer };
