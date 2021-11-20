import { useEffect, useRef } from 'react';
import { PollGeneratorChoiceInfo, PollGeneratorInput, Reaction } from '@/types/common';
import styles from '@/styles/canvas.module.css';
import {
  drawReactions,
  drawTitle,
  formatChoicesForDisplay,
  generateReactionConfigs,
  getContext,
} from '@/utils/poll-drawer';
import { PollGeneratorChoice } from '@/components/poll/poll-generator-choice';

type Props = {
  generatorState: PollGeneratorInput;
  onDownloadButtonClick: (canvas: HTMLCanvasElement | null) => void;
  onPollChoiceChange: (reaction: Reaction, value: PollGeneratorChoiceInfo) => void;
  onTitleChange: (value: string) => void;
};

const reactions: Reaction[] = ['like', 'celebrate', 'love', 'insightful', 'curious'];

const PollDrawer = ({ generatorState, onDownloadButtonClick, onPollChoiceChange, onTitleChange }: Props) => {
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

    const selectedChoices = formatChoicesForDisplay(generatorState.choices);

    const reactionConfigs = generateReactionConfigs({
      likeContext,
      celebrateContext,
      loveContext,
      insightfulContext,
      curiousContext,
    });

    drawTitle(titleContext, generatorState.title.toUpperCase() || 'Poll Title');

    drawReactions(selectedChoices, reactionConfigs).then(() => {
      mainContext.clearRect(0, 0, 640, 360);
      mainContext.fillStyle = '#fff';
      // mainContext.fillRect(0, 0, 640, 360);
      mainContext.drawImage(titleContext.canvas, 20, 20, 600, 50);

      const xPosition = 640 / 2 - (120 * selectedChoices.length) / 2;

      selectedChoices.forEach((choice, index) => {
        const config = reactionConfigs[choice.reaction];

        const x = xPosition + 120 * index;
        mainContext.drawImage(config.context.canvas, x, 90, 120, 340);
      });
    });
  }, [generatorState]);

  return (
    <>
      <div>
        <canvas id="poll" width="640" height="360" className={styles.canvas} ref={mainCanvasRef} />
        <canvas id="poll-title" width="600" height="50" className="sub-draw" ref={titleCanvasRef} />
        <canvas id="like-reaction" width="120" height="340" className="sub-draw" ref={likeCanvasRef} />
        <canvas id="celebrate-reaction" width="120" height="340" className="sub-draw" ref={celebrateCanvasRef} />
        <canvas id="love-reaction" width="120" height="340" className="sub-draw" ref={loveCanvasRef} />
        <canvas id="insightful-reaction" width="120" height="340" className="sub-draw" ref={insightfulCanvasRef} />
        <canvas id="curious-reaction" width="120" height="340" className="sub-draw" ref={curiousCanvasRef} />
      </div>

      <div className={styles.pollChoice}>
        {reactions.map((reaction) => (
          <PollGeneratorChoice
            key={`lnkd-${reaction}`}
            reaction={reaction}
            value={generatorState.choices[reaction]}
            onChange={(value) => onPollChoiceChange(reaction, value)}
          />
        ))}
      </div>

      <div className={styles.pollAction}>
        <div>
          <label htmlFor="poll-title">Poll Title</label>
          <input
            type="text"
            id="poll-title"
            value={generatorState.title}
            placeholder="Enter the poll title here..."
            onChange={(e) => onTitleChange(e.target.value)}
            className={styles.inputTitle}
          />
        </div>
        <div>
          <label>When complete</label>
          <button onClick={() => onDownloadButtonClick(mainCanvasRef.current)}>Download</button>
        </div>
      </div>
    </>
  );
};

export { PollDrawer };
