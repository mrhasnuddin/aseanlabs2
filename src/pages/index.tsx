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
            onEnter: () => {
              gsap.to(document.documentElement, { 
                '--background': 'var(--color-struct)', 
                '--rgb-background': 'var(--rgb-struct)',
                '--foreground': 'var(--color-canvas)',
                '--rgb-foreground': 'var(--rgb-canvas)',
                duration: 0.5 
              });
            },
            onLeaveBack: () => {
              gsap.to(document.documentElement, { 
                '--background': 'var(--color-canvas)', 
                '--rgb-background': 'var(--rgb-canvas)',
                '--foreground': 'var(--color-struct)',
                '--rgb-foreground': 'var(--rgb-struct)',
                duration: 0.5 
              });
            }
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

      // Native CSS scroll snapping is now used (via snap-y snap-proximity on html)
      // for a better rubber-band effect.

      // Generic entrance animation for sections
      const fadeElements = gsap.utils.toArray('.animate-fade-in');
      fadeElements.forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            }
          }
        );
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
        <section className="" id="hero"><Hero /></section>
        <div id="social-proof"><PartnersSection /></div>
        <div 
          id="about"
          className="relative"
          style={{ 
            '--background': 'var(--color-struct)', 
            '--rgb-background': 'var(--rgb-struct)',
            '--foreground': 'var(--color-canvas)',
            '--rgb-foreground': 'var(--rgb-canvas)',
            backgroundColor: 'var(--color-struct)',
            color: 'var(--color-canvas)'
          } as React.CSSProperties}
        >
          <StatsSection />
        </div>
        <section className="relative" id="why-us"><AudienceCardsSection /></section>
        <section className="relative" id="capabilities"><ServicesSection /></section>
        <div 
          id="foundation-section-wrapper"
          className="relative"
          style={{ 
            '--background': 'var(--color-canvas)', 
            '--rgb-background': 'var(--rgb-canvas)',
            '--foreground': 'var(--color-struct)',
            '--rgb-foreground': 'var(--rgb-struct)',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-struct)'
          } as React.CSSProperties}
        >
          <div id="integrations" className="absolute -top-24"></div>
          <FoundationSection />
        </div>
        <div 
          id="dao-section"
          className="relative"
          style={{ 
            '--background': 'var(--color-canvas)', 
            '--rgb-background': 'var(--rgb-canvas)',
            '--foreground': 'var(--color-struct)',
            '--rgb-foreground': 'var(--rgb-struct)',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-struct)'
          } as React.CSSProperties}
        >
          <div id="dao-as-a-service" className="absolute -top-24"></div>
          <DaoaaSSection />
        </div>
        <section className="snap-start relative" id="ecosystem-snap">
          <div id="ecosystem" className="absolute -top-24"></div>
          <EcosystemSection />
        </section>
        <section className="relative" id="final-cta">
          <div id="faq" className="absolute -top-24"></div>
          <FinalCta />
        </section>
        <section className="" id="footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
