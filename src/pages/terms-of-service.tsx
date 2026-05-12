import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsOfServicePage() {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.fromTo('#page-wrapper',
      { clipPath: 'circle(0% at 50% 0%)' },
      {
        clipPath: 'circle(150% at 50% 0%)',
        duration: 1.2,
        ease: 'power3.inOut'
      }
    );
  }, []);

  return (
    <div className="bg-canvas text-struct overflow-hidden selection:bg-struct selection:text-canvas">
      <Head>
        <title>{t('tos.pageTitle') !== 'tos.pageTitle' ? t('tos.pageTitle') : 'Terms of Service — ASEAN Labs'}</title>
        <meta name="description" content={t('tos.pageDesc') !== 'tos.pageDesc' ? t('tos.pageDesc') : 'Terms of Service for ASEAN Labs.'} />
      </Head>

      <Nav />

      <div id="page-wrapper" className="min-h-screen pb-20">
        {/* Background Dot Grid */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
          }}
        />

        <main className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-32 lg:py-40 flex flex-col items-center">
          <div className="w-full">
            {/* Back Button */}
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-struct px-6 py-3 transition-colors duration-0 hover:bg-struct hover:text-canvas"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('tos.backToHome') !== 'tos.backToHome' ? t('tos.backToHome') : 'Back to Home'}
            </Link>

            {/* Content Container */}
            <div className="bg-struct text-relief p-8 md:p-12 lg:p-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-struct flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
              
              <div className="lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-32 h-fit">
                <header className="border-b-4 border-canvas pb-8">
                  <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1] tracking-tighter mb-6 text-canvas">
                    {t('tos.titlePart1') !== 'tos.titlePart1' ? t('tos.titlePart1') : 'Terms'}<br className="hidden lg:block"/> {t('tos.titlePart2') !== 'tos.titlePart2' ? t('tos.titlePart2') : 'of'}<br className="hidden lg:block"/> {t('tos.titlePart3') !== 'tos.titlePart3' ? t('tos.titlePart3') : 'Service'}
                  </h1>
                  <div className="inline-block bg-canvas text-struct font-mono text-sm font-bold uppercase tracking-widest px-4 py-2 border-2 border-struct">
                    {t('tos.lastUpdated') !== 'tos.lastUpdated' ? t('tos.lastUpdated') : 'Last Updated: January 24, 2026'}
                  </div>
                </header>
                <p className="font-mono text-relief/70 text-sm md:text-base leading-relaxed max-w-sm">
                  {t('tos.introText') !== 'tos.introText' ? t('tos.introText') : 'Please read these terms carefully before using our platform. They contain important information about your legal rights and obligations.'}
                </p>
              </div>

              <div className="lg:w-2/3 prose prose-lg max-w-none font-mono text-relief/80 prose-headings:font-sans prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-relief prose-h2:text-3xl prose-h2:border-l-8 prose-h2:border-canvas prose-h2:pl-4 prose-h2:mt-24 prose-h2:mb-8 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-relief prose-a:text-struct prose-a:bg-canvas prose-a:px-1 prose-a:no-underline hover:prose-a:bg-canvas hover:prose-a:transition-colors">
                
                <p className="text-xl font-bold font-sans text-relief border-l-4 border-canvas pl-6 py-2">
                  {t('tos.intro') !== 'tos.intro' ? t('tos.intro') : 'By accessing or using the'} <span className="text-canvas">{t('tos.companyName') !== 'tos.companyName' ? t('tos.companyName') : 'ASEAN LABS'}</span> {t('tos.introEnd') !== 'tos.introEnd' ? t('tos.introEnd') : 'website, you agree to these Terms of Service. If you do not agree, please discontinue use.'}
                </p>

                <h2>{t('tos.h1') !== 'tos.h1' ? t('tos.h1') : '1. About ASEAN LABS'}</h2>
                <p>
                  <span className="text-canvas font-bold">{t('tos.companyName') !== 'tos.companyName' ? t('tos.companyName') : 'ASEAN LABS'}</span> {t('tos.p1') !== 'tos.p1' ? t('tos.p1') : 'is a Web3 incubator and ecosystem platform supporting builders, startups, and communities across Southeast Asia, including initiatives built on or aligned with the ENI ecosystem.'}
                </p>

                <h2>{t('tos.h2') !== 'tos.h2' ? t('tos.h2') : '2. Eligibility'}</h2>
                <p>
                  {t('tos.p2') !== 'tos.p2' ? t('tos.p2') : 'You must be at least 18 years old to use our website or apply for our programs.'}
                </p>

                <h2>{t('tos.h3') !== 'tos.h3' ? t('tos.h3') : '3. Use of Website'}</h2>
                <p>{t('tos.p3') !== 'tos.p3' ? t('tos.p3') : 'You agree to:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('tos.l1') !== 'tos.l1' ? t('tos.l1') : 'Use the website for lawful purposes only'}</li>
                  <li>{t('tos.l2') !== 'tos.l2' ? t('tos.l2') : 'Not attempt to disrupt, exploit, or harm our systems or users'}</li>
                  <li>{t('tos.l3') !== 'tos.l3' ? t('tos.l3') : 'Provide accurate information when submitting forms or applications'}</li>
                </ul>

                <h2>{t('tos.h4') !== 'tos.h4' ? t('tos.h4') : '4. Grant Programs & Incubation'}</h2>
                <p>{t('tos.p4') !== 'tos.p4' ? t('tos.p4') : 'Participation in any grant or incubation program:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('tos.l4') !== 'tos.l4' ? t('tos.l4') : 'Is not guaranteed'}</li>
                  <li>{t('tos.l5') !== 'tos.l5' ? t('tos.l5') : 'Is subject to internal review, evaluation, and selection criteria'}</li>
                  <li>{t('tos.l6') !== 'tos.l6' ? t('tos.l6') : 'Does not constitute investment advice, financial advice, or a promise of funding'}</li>
                </ul>
                <p className="font-bold bg-relief/5 p-6 border-l-4 border-canvas mt-6 text-relief">
                  {t('tos.p5') !== 'tos.p5' ? t('tos.p5') : 'ASEAN LABS reserves full discretion over grant allocation and program structure.'}
                </p>

                <h2>{t('tos.h5') !== 'tos.h5' ? t('tos.h5') : '5. Intellectual Property'}</h2>
                <p>
                  {t('tos.p6') !== 'tos.p6' ? t('tos.p6') : 'All content on this website, including text, branding, visuals, and materials, belongs to ASEAN LABS unless otherwise stated. You may not copy, reproduce, or redistribute content without prior permission.'}
                </p>

                <h2>{t('tos.h6') !== 'tos.h6' ? t('tos.h6') : '6. Web3 & Blockchain Disclaimer'}</h2>
                <p>{t('tos.p7') !== 'tos.p7' ? t('tos.p7') : 'You acknowledge that:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-canvas font-bold">{t('tos.l7t') !== 'tos.l7t' ? t('tos.l7t') : 'Blockchain technologies'}</span> {t('tos.l7b') !== 'tos.l7b' ? t('tos.l7b') : 'involve inherent risks'}</li>
                  <li>{t('tos.l8') !== 'tos.l8' ? t('tos.l8') : 'On-chain activity is public and irreversible'}</li>
                  <li>{t('tos.l9') !== 'tos.l9' ? t('tos.l9') : 'ASEAN LABS does not control decentralized networks or smart contracts'}</li>
                </ul>
                <p className="font-bold bg-relief/5 p-6 border-l-4 border-canvas mt-6 text-relief">
                  {t('tos.p8') !== 'tos.p8' ? t('tos.p8') : 'You are solely responsible for your wallet security and on-chain actions.'}
                </p>

                <h2>{t('tos.h7') !== 'tos.h7' ? t('tos.h7') : '7. Limitation of Liability'}</h2>
                <p>{t('tos.p9') !== 'tos.p9' ? t('tos.p9') : 'ASEAN LABS shall not be liable for:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('tos.l10') !== 'tos.l10' ? t('tos.l10') : 'Losses arising from blockchain usage or third-party platforms'}</li>
                  <li>{t('tos.l11') !== 'tos.l11' ? t('tos.l11') : 'Market volatility, token value changes, or protocol failures'}</li>
                  <li>{t('tos.l12') !== 'tos.l12' ? t('tos.l12') : 'Indirect or consequential damages'}</li>
                </ul>
                <p className="font-bold uppercase tracking-widest mt-6 text-canvas">
                  {t('tos.p10') !== 'tos.p10' ? t('tos.p10') : 'All services are provided "as is".'}
                </p>

                <h2>{t('tos.h8') !== 'tos.h8' ? t('tos.h8') : '8. Termination'}</h2>
                <p>
                  {t('tos.p11') !== 'tos.p11' ? t('tos.p11') : 'We reserve the right to suspend or restrict access to our website or services at any time if these terms are violated.'}
                </p>

                <h2>{t('tos.h9') !== 'tos.h9' ? t('tos.h9') : '9. Governing Law'}</h2>
                <p>
                  {t('tos.p12') !== 'tos.p12' ? t('tos.p12') : 'These Terms shall be governed by applicable laws in relevant ASEAN jurisdictions, without regard to conflict of law principles.'}
                </p>

                <h2>{t('tos.h10') !== 'tos.h10' ? t('tos.h10') : '10. Updates to Terms'}</h2>
                <p>
                  {t('tos.p13') !== 'tos.p13' ? t('tos.p13') : 'We may update these Terms at any time. Continued use indicates acceptance of the revised terms.'}
                </p>

                <hr className="my-24 border-2 border-relief/10" />

                <h2>{t('tos.contactTitle') !== 'tos.contactTitle' ? t('tos.contactTitle') : 'Contact Us'}</h2>
                <p>
                  {t('tos.contactText') !== 'tos.contactText' ? t('tos.contactText') : 'To resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:'}
                </p>
                
                <EmailCopy />

              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function EmailCopy() {
  const [copied, setCopied] = React.useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText('Info@aseanlabs.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 flex flex-col items-start gap-4">
      <div className="flex items-center gap-6">
        <span className="font-sans text-xl md:text-2xl font-black text-canvas tracking-tight">
          Info@aseanlabs.io
        </span>
        <button
          onClick={handleCopy}
          className="h-10 w-10 flex flex-shrink-0 items-center justify-center border border-canvas/30 bg-transparent text-canvas transition-colors duration-0 hover:bg-canvas hover:text-struct"
          title="Copy to clipboard"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      <p className="font-sans font-bold uppercase tracking-widest text-sm text-relief/50">
        {t('tos.aseanLabs') !== 'tos.aseanLabs' ? t('tos.aseanLabs') : 'ASEAN LABS'}<br/>
        {t('tos.incubating') !== 'tos.incubating' ? t('tos.incubating') : 'Incubating Web3 Across ASEAN'}
      </p>
    </div>
  );
}
