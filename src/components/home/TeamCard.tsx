import { ArrowTopRightIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { LogoMark } from '@/components/icons/BrandSymbols';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './TeamCard.module.css';

export const TEAM = [
  { id: 'dean', name: 'Dean', edition: '001', portrait: '/team/dean-anime.png', href: 'https://www.linkedin.com/in/hasnuddin/' },
  { id: 'leo', name: 'Leo', edition: '002', portrait: '/team/leo-anime-v2.png', href: 'https://www.linkedin.com/in/amir-leo-bb49b0325/' },
  { id: 'irhas', name: 'Irhas', edition: '003', portrait: '/team/irhas-anime.png', href: 'https://www.linkedin.com/in/muhamad-syazwan-bahrom-162029147/' },
] as const;
export type MemberId = typeof TEAM[number]['id'];

export function TeamCard({ id }: { id: MemberId }) {
  const member = TEAM.find((person) => person.id === id)!;
  const { t } = useTranslation();
  return <article className={styles.card} data-member={id} aria-labelledby={`member-${id}`}>
    <div className={styles.masthead}>
      <span className={styles.wordmark}><LogoMark size={18} style={{ color: 'inherit' }} aria-hidden="true" />ASEAN<span>LABS</span></span>
      <span className={styles.serial}>#{member.edition}</span>
    </div>
    <div className={styles.artwork}><Image src={member.portrait} alt={`Anime-style portrait of ${member.name}`} width={1024} height={1024} sizes="(max-width: 1000px) 420px, (max-width: 1500px) 33vw, 420px" /></div>
    <div className={styles.body}>
      <div className={styles.identity}><span className={styles.role}>{t(`team.${id}Role`)}</span><h3 id={`member-${id}`}>{member.name}</h3></div>
      <p className={styles.bio}>{t(`team.${id}CardBio`)}</p>
    </div>
    <a className={styles.social} href={member.href} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${member.name} on LinkedIn (opens in a new tab)`}>
      <LinkedInLogoIcon width={18} height={18} aria-hidden="true" /><span>Connect on LinkedIn</span><ArrowTopRightIcon width={18} height={18} aria-hidden="true" />
    </a>
    <div className={styles.provenance}><span>ASEANLABS / CORE TEAM</span><span>{member.edition} / 003</span></div>
  </article>;
}
