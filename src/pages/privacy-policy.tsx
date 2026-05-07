import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPolicyPage() {
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
    <div className="bg-[#F4BF4B] text-black overflow-hidden selection:bg-black selection:text-[#F4BF4B]">
      <Head>
        <title>{t('privacy.pageTitle') !== 'privacy.pageTitle' ? t('privacy.pageTitle') : 'Privacy Policy — ASEAN Labs'}</title>
        <meta name="description" content={t('privacy.pageDesc') !== 'privacy.pageDesc' ? t('privacy.pageDesc') : 'Privacy Policy for ASEAN Labs.'} />
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
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 transition-colors duration-0 hover:bg-black hover:text-[#F4BF4B]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('privacy.backToHome') !== 'privacy.backToHome' ? t('privacy.backToHome') : 'Back to Home'}
            </Link>

            {/* Content Container */}
            <div className="bg-black text-white p-8 md:p-12 lg:p-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-black flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
              
              <div className="lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-32 h-fit">
                <header className="border-b-4 border-[#F4BF4B] pb-8">
                  <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1] tracking-tighter mb-6 text-[#F4BF4B]">
                    {t('privacy.titlePart1') !== 'privacy.titlePart1' ? t('privacy.titlePart1') : 'Privacy'}<br className="hidden lg:block"/> {t('privacy.titlePart2') !== 'privacy.titlePart2' ? t('privacy.titlePart2') : 'Policy'}
                  </h1>
                  <div className="inline-block bg-[#F4BF4B] text-black font-mono text-sm font-bold uppercase tracking-widest px-4 py-2 border-2 border-black">
                    {t('privacy.lastUpdated') !== 'privacy.lastUpdated' ? t('privacy.lastUpdated') : 'Last Updated: January 24, 2026'}
                  </div>
                </header>
                <p className="font-mono text-white/70 text-sm md:text-base leading-relaxed max-w-sm">
                  {t('privacy.introText') !== 'privacy.introText' ? t('privacy.introText') : 'This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with our services.'}
                </p>
              </div>

              <div className="lg:w-2/3 prose prose-lg max-w-none font-mono text-white/80 prose-headings:font-sans prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white prose-h2:text-3xl prose-h2:border-l-8 prose-h2:border-[#F4BF4B] prose-h2:pl-4 prose-h2:mt-24 prose-h2:mb-8 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-white prose-a:text-black prose-a:bg-[#F4BF4B] prose-a:px-1 prose-a:no-underline hover:prose-a:bg-[#F4BF4B] hover:prose-a:transition-colors">
                
                <p className="text-xl font-bold font-sans text-white border-l-4 border-[#F4BF4B] pl-6 py-2">
                  <span className="text-[#F4BF4B]">{t('privacy.companyName') !== 'privacy.companyName' ? t('privacy.companyName') : 'ASEAN LABS'}</span> {t('privacy.intro') !== 'privacy.intro' ? t('privacy.intro') : '("we", "our", or "us") respects your privacy and is committed to protecting your personal data.'}
                </p>

                <h2>{t('privacy.h1') !== 'privacy.h1' ? t('privacy.h1') : '1. Information We Collect'}</h2>
                <p>{t('privacy.p1') !== 'privacy.p1' ? t('privacy.p1') : 'We may collect the following types of information:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-[#F4BF4B] font-bold">{t('privacy.l1t') !== 'privacy.l1t' ? t('privacy.l1t') : 'Personal Information:'}</span> {t('privacy.l1b') !== 'privacy.l1b' ? t('privacy.l1b') : 'Name, email address, wallet address, project details, or any information you voluntarily provide through contact forms, grant applications, or inquiries.'}</li>
                  <li><span className="text-[#F4BF4B] font-bold">{t('privacy.l2t') !== 'privacy.l2t' ? t('privacy.l2t') : 'Technical & Usage Data:'}</span> {t('privacy.l2b') !== 'privacy.l2b' ? t('privacy.l2b') : 'IP address, browser type, device information, pages visited, and interaction data collected through cookies or analytics tools.'}</li>
                  <li><span className="text-[#F4BF4B] font-bold">{t('privacy.l3t') !== 'privacy.l3t' ? t('privacy.l3t') : 'Web3-Related Data:'}</span> {t('privacy.l3b') !== 'privacy.l3b' ? t('privacy.l3b') : 'Public blockchain data such as wallet addresses and on-chain interactions. We do not control or store private keys.'}</li>
                </ul>

                <h2>{t('privacy.h2') !== 'privacy.h2' ? t('privacy.h2') : '2. How We Use Your Information'}</h2>
                <p>{t('privacy.p2') !== 'privacy.p2' ? t('privacy.p2') : 'We use collected information to:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.l4') !== 'privacy.l4' ? t('privacy.l4') : 'Evaluate grant applications and incubator participation'}</li>
                  <li>{t('privacy.l5') !== 'privacy.l5' ? t('privacy.l5') : 'Communicate with you regarding programs, updates, or partnerships'}</li>
                  <li>{t('privacy.l6') !== 'privacy.l6' ? t('privacy.l6') : 'Improve website performance and user experience'}</li>
                  <li>{t('privacy.l7') !== 'privacy.l7' ? t('privacy.l7') : 'Maintain security, compliance, and operational integrity'}</li>
                  <li>{t('privacy.l8a') !== 'privacy.l8a' ? t('privacy.l8a') : 'Support ecosystem growth within '} <span className="text-[#F4BF4B] font-bold">{t('privacy.l8b') !== 'privacy.l8b' ? t('privacy.l8b') : 'ASEAN LABS'}</span> {t('privacy.l8c') !== 'privacy.l8c' ? t('privacy.l8c') : ' and ENI-related initiatives'}</li>
                </ul>

                <h2>{t('privacy.h3') !== 'privacy.h3' ? t('privacy.h3') : '3. Data Sharing & Disclosure'}</h2>
                <p>{t('privacy.p3') !== 'privacy.p3' ? t('privacy.p3') : 'We do not sell your personal data. We may share information only with:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.l9') !== 'privacy.l9' ? t('privacy.l9') : 'Trusted partners (e.g. infrastructure providers, analytics tools)'}</li>
                  <li>{t('privacy.l10') !== 'privacy.l10' ? t('privacy.l10') : 'Legal or regulatory authorities if required by law'}</li>
                  <li>{t('privacy.l11') !== 'privacy.l11' ? t('privacy.l11') : 'ENI ecosystem partners only when relevant to program participation'}</li>
                </ul>
                <p className="font-bold bg-white/5 p-6 border-l-4 border-[#F4BF4B] mt-6 text-white">
                  {t('privacy.p4') !== 'privacy.p4' ? t('privacy.p4') : 'All shared data is handled under confidentiality and security obligations.'}
                </p>

                <h2>{t('privacy.h4') !== 'privacy.h4' ? t('privacy.h4') : '4. Cookies & Analytics'}</h2>
                <p>{t('privacy.p5') !== 'privacy.p5' ? t('privacy.p5') : 'We may use cookies or similar technologies to:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.l12') !== 'privacy.l12' ? t('privacy.l12') : 'Understand website traffic and usage'}</li>
                  <li>{t('privacy.l13') !== 'privacy.l13' ? t('privacy.l13') : 'Improve content and functionality'}</li>
                </ul>
                <p className="mt-4">
                  {t('privacy.p6') !== 'privacy.p6' ? t('privacy.p6') : 'You may disable cookies via your browser settings.'}
                </p>

                <h2>{t('privacy.h5') !== 'privacy.h5' ? t('privacy.h5') : '5. Data Security'}</h2>
                <p>
                  {t('privacy.p7') !== 'privacy.p7' ? t('privacy.p7') : 'We implement reasonable technical and organizational measures to protect your information. However, no digital system is 100% secure, especially in decentralized environments.'}
                </p>

                <h2>{t('privacy.h6') !== 'privacy.h6' ? t('privacy.h6') : '6. Your Rights'}</h2>
                <p>{t('privacy.p8') !== 'privacy.p8' ? t('privacy.p8') : 'Depending on your jurisdiction, you may have the right to:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.l14') !== 'privacy.l14' ? t('privacy.l14') : 'Access, update, or delete your personal data'}</li>
                  <li>{t('privacy.l15') !== 'privacy.l15' ? t('privacy.l15') : 'Withdraw consent for data processing'}</li>
                  <li>{t('privacy.l16') !== 'privacy.l16' ? t('privacy.l16') : 'Request clarification on data usage'}</li>
                </ul>
                <p className="mt-4">
                  {t('privacy.p9') !== 'privacy.p9' ? t('privacy.p9') : 'You may contact us to exercise these rights.'}
                </p>

                <h2>{t('privacy.h7') !== 'privacy.h7' ? t('privacy.h7') : '7. Third-Party Links'}</h2>
                <p>
                  {t('privacy.p10') !== 'privacy.p10' ? t('privacy.p10') : 'Our website may contain links to third-party platforms or dApps. We are not responsible for their privacy practices.'}
                </p>

                <h2>{t('privacy.h8') !== 'privacy.h8' ? t('privacy.h8') : '8. Updates to This Policy'}</h2>
                <p>
                  {t('privacy.p11') !== 'privacy.p11' ? t('privacy.p11') : 'We may update this Privacy Policy from time to time. Continued use of our website indicates acceptance of the updated policy.'}
                </p>

                <hr className="my-24 border-2 border-white/10" />

                <h2>{t('privacy.contactTitle') !== 'privacy.contactTitle' ? t('privacy.contactTitle') : 'Contact Us'}</h2>
                <p>
                  {t('privacy.contactText') !== 'privacy.contactText' ? t('privacy.contactText') : 'If you have questions or comments about this Privacy Policy, please contact us at:'}
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
        <span className="font-sans text-xl md:text-2xl font-black text-[#F4BF4B] tracking-tight">
          Info@aseanlabs.io
        </span>
        <button
          onClick={handleCopy}
          className="h-10 w-10 flex flex-shrink-0 items-center justify-center border border-[#F4BF4B]/30 bg-transparent text-[#F4BF4B] transition-colors duration-0 hover:bg-[#F4BF4B] hover:text-black"
          title="Copy to clipboard"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      <p className="font-sans font-bold uppercase tracking-widest text-sm text-white/50">
        {t('privacy.aseanLabs') !== 'privacy.aseanLabs' ? t('privacy.aseanLabs') : 'ASEAN LABS'}<br/>
        {t('privacy.incubating') !== 'privacy.incubating' ? t('privacy.incubating') : 'Incubating Web3 Across ASEAN'}
      </p>
    </div>
  );
}
