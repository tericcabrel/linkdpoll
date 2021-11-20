import Head from 'next/head';

import styles from '@/styles/home.module.css';
import { PollGenerator } from '@/components/poll/poll-generator';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LinkedIn Reaction Poll Generator</title>
        <meta name="description" content="LinkedIn Reaction Poll Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PollGenerator />
      </main>
    </div>
  );
}
