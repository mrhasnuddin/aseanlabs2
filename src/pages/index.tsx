import Head from 'next/head';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { FoundationSection } from '@/components/FoundationSection';
import { AudienceCardsSection } from '@/components/AudienceCardsSection';
import { DaoaaSSection } from '@/components/DaoaaSSection';
import { EcosystemSection } from '@/components/EcosystemSection';
import { PartnersSection } from '@/components/PartnersSection';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Scroll microinteraction: Namada-style circular clip-path transition for StatsSection
      gsap.fromTo('#about',
        { clipPath: 'circle(0% at 50% 0%)' },
        {
          clipPath: 'circle(150% at 50% 0%)',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
            end: 'top 10%',
            scrub: 1,
          },
          ease: 'power2.inOut'
        }
      );

      // Scroll microinteraction: Namada-style circular clip-path transition for FoundationSection
      gsap.fromTo('#foundation-section-wrapper',
        { clipPath: 'circle(0% at 50% 0%)' },
        {
          clipPath: 'circle(150% at 50% 0%)',
          scrollTrigger: {
            trigger: '#foundation-section-wrapper',
            start: 'top 75%',
            end: 'top 10%',
            scrub: 1,
          },
          ease: 'power2.inOut'
        }
      );

      // Buttery smooth snapping
      const sections = gsap.utils.toArray('.snap-start') as HTMLElement[];
      const getSnaps = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        return sections.map(s => ScrollTrigger.create({ trigger: s, start: "top top" }).start / scrollHeight);
      };

      ScrollTrigger.create({
        start: 0,
        end: "bottom bottom",
        snap: {
          snapTo: getSnaps,
          duration: { min: 0.4, max: 0.8 },
          delay: 0.1,
          ease: "power3.inOut"
        } as any
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <Head>
        <title>ASEAN Labs — The Execution Layer for ENI Builders</title>
        <meta
          name="description"
          content="A paid execution partner for serious Web3 projects in Southeast Asia. From idea to on-chain traction."
        />
        <meta property="og:title" content="ASEAN Labs — The Execution Layer for ENI Builders" />
        <meta
          property="og:description"
          content="A paid execution partner for serious Web3 projects in Southeast Asia. From idea to on-chain traction."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <main>
        <section className="snap-start" id="hero"><Hero /></section>
        <div id="social-proof"><PartnersSection /></div>
        <div 
          id="about"
          className="snap-start relative"
          style={{ 
            '--background': '#000000', 
            '--foreground': '#F4BF4B',
            backgroundColor: '#000000',
            color: '#F4BF4B'
          } as React.CSSProperties}
        >
          <StatsSection />
        </div>
        <section className="snap-start relative" id="why-us"><AudienceCardsSection /></section>
        <section className="snap-start relative" id="capabilities"><ServicesSection /></section>
        <div 
          id="foundation-section-wrapper"
          className="snap-start relative"
          style={{ 
            '--background': '#F4BF4B', 
            '--foreground': '#000000',
            backgroundColor: '#F4BF4B',
            color: '#000000'
          } as React.CSSProperties}
        >
          <div id="integrations" className="absolute -top-24"></div>
          <FoundationSection />
        </div>
        <div 
          id="dao-section"
          className="snap-start relative"
          style={{ 
            '--background': '#F4BF4B', 
            '--foreground': '#000000',
            backgroundColor: '#F4BF4B',
            color: '#000000'
          } as React.CSSProperties}
        >
          <div id="dao-as-a-service" className="absolute -top-24"></div>
          <DaoaaSSection />
        </div>
        <section className="snap-start relative" id="ecosystem-snap">
          <div id="ecosystem" className="absolute -top-24"></div>
          <EcosystemSection />
        </section>
        <section className="snap-start relative" id="final-cta">
          <div id="faq" className="absolute -top-24"></div>
          <FinalCta />
        </section>
        <section className="snap-start" id="footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
