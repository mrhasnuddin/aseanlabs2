import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, DownloadIcon } from '@radix-ui/react-icons';
import { TEAM, TeamCard } from '@/components/home/TeamCard';
import styles from '@/styles/team-cards.module.css';

export default function TeamCards() {
  return <>
    <Head><title>Core team collection | ASEAN Labs</title><meta name="robots" content="noindex" /></Head>
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Preview navigation"><Link href="/"><ArrowLeftIcon aria-hidden="true" /> Back to ASEAN Labs</Link><span>CORE TEAM COLLECTION / 01</span></nav>
      <header className={styles.heading}><p>ASEANLABS / THE CORE TEAM</p><h1>The people<br />behind the work.</h1><div>Builders with different strengths.<br />One team getting things shipped.</div></header>
      <ul className={styles.collection}>
        {TEAM.map((member) => <li key={member.id}>
          <TeamCard id={member.id} />
          <a className={styles.download} href={member.portrait} download><DownloadIcon aria-hidden="true" /> Download {member.name}’s portrait · PNG</a>
        </li>)}
      </ul>
      <footer className={styles.footer}><span>ASEAN LABS © {new Date().getFullYear()}</span><span>CORE TEAM / 3 PORTRAITS</span></footer>
    </main>
  </>;
}
