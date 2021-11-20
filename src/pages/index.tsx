import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import { PollGenerator } from '@/components/poll/PollGenerator';

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
      <Image src="/images/like.png" alt="Like icon" width={72} height={72} />
    </div>
  );
}
