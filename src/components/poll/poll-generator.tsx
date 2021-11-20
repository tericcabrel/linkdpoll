import styles from '@/styles/poll-generator.module.css';
import { PollGeneratorChoiceInfo, Reaction } from '@/types/common';
import { usePollGeneratorState } from '@/hooks/usePollGenerateState';
import { PollGeneratorChoice } from '@/components/poll/poll-generator-choice';
import { PollDrawer } from '@/components/poll/poll-drawer';

const reactions: Reaction[] = ['like', 'celebrate', 'love', 'insightful', 'curious'];

const PollGenerator = () => {
  const { generatorState, updateChoice, updateTitle } = usePollGeneratorState();

  const handlePollChoiceChange = (reaction: Reaction, choiceInfo: PollGeneratorChoiceInfo) => {
    updateChoice({
      reaction,
      ...choiceInfo,
    });
  };

  return (
    <div className={styles.container}>
      <h1>LinkedIn Reaction Poll Generator</h1>
      <PollDrawer input={generatorState} />
      <div className={styles.pollChoice}>
        {reactions.map((reaction) => (
          <PollGeneratorChoice
            key={`lnkd-${reaction}`}
            reaction={reaction}
            value={generatorState.choices[reaction]}
            onChange={(value) => handlePollChoiceChange(reaction, value)}
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
            onChange={(e) => updateTitle(e.target.value)}
            className={styles.inputTitle}
          />
        </div>
        <div>
          <label>When complete</label>
          <button>Download</button>
        </div>
      </div>
    </div>
  );
};

export { PollGenerator };
