import { ChangeEvent } from 'react';
import Image from 'next/image';

import { PollGeneratorChoiceInfo, Reaction } from '@/types/common';
import { reactionPicturePathMaps } from '@/utils/constants';
import styles from '@/styles/poll-generator-choice.module.css';

type Props = {
  reaction: Reaction;
  value: PollGeneratorChoiceInfo;
  onChange: (value: PollGeneratorChoiceInfo) => void;
};

const PollGeneratorChoice = ({ reaction, value, onChange }: Props) => {
  const toggleReactionChange = () => {
    onChange({ ...value, checked: !value.checked });
  };

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, text: event.target.value });
  };

  return (
    <div className="generator-choice">
      <label htmlFor="reaction-select" className={styles.label}>
        <input
          type="checkbox"
          checked={value.checked}
          onClick={toggleReactionChange}
        />
        <Image
          src={reactionPicturePathMaps[reaction]}
          alt={`${reaction} picture`}
          width={72}
          height={72}
        />
      </label>
      <input
        type="text"
        value={value.text}
        onChange={handleLabelChange}
        placeholder={`Enter label for ${reaction}`}
        className={styles.input}
      />
    </div>
  );
};

export { PollGeneratorChoice };
