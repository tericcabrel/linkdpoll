import styles from '@/styles/poll-generator.module.css';
import { PollGeneratorChoiceInfo, Reaction } from '@/types/common';
import { usePollGeneratorState } from '@/hooks/usePollGenerateState';
import { PollDrawer } from '@/components/poll/poll-drawer';

const PollGenerator = () => {
  const { generatorState, updateChoice, updateTitle } = usePollGeneratorState();

  const handlePollChoiceChange = (reaction: Reaction, choiceInfo: PollGeneratorChoiceInfo) => {
    updateChoice({
      reaction,
      ...choiceInfo,
    });
  };

  const handleDownloadCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      return;
    }

    const image = canvas.toDataURL();
    const aDownloadLink = document.createElement('a');
    aDownloadLink.download = `linkedin_poll_${new Date().getTime()}.png`;
    aDownloadLink.href = image;
    aDownloadLink.click();
  };

  return (
    <div className={styles.container}>
      <h1>LinkedIn Reaction Poll Generator</h1>

      <PollDrawer
        generatorState={generatorState}
        onDownloadButtonClick={handleDownloadCanvas}
        onPollChoiceChange={handlePollChoiceChange}
        onTitleChange={updateTitle}
      />
    </div>
  );
};

export { PollGenerator };
