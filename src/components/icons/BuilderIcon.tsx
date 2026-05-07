import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BuilderIconProps {
  className?: string;
}

export function BuilderIcon({ className }: BuilderIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !ballRef.current || !shadowRef.current) return;

    // Only enable on desktop/hover devices
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    // Create a timeline for the bounce effect
    const tl = gsap.timeline({ paused: true });

    // Ball bounce animation
    tl.to(ballRef.current, {
      y: -15, // Move up
      duration: 0.6,
      ease: "power2.out"
    }).to(ballRef.current, {
      y: 0, // Move down
      duration: 0.5,
      ease: "bounce.out"
    });

    // Shadow animation: scale down and fade slightly as ball goes up
    tl.to(shadowRef.current, {
      scale: 0.6,
      opacity: 0.15,
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "center center"
    }, 0).to(shadowRef.current, {
      scale: 1,
      opacity: 0.3,
      duration: 0.5,
      ease: "bounce.out"
    }, 0.6);

    timelineRef.current = tl;

    const onMouseEnter = () => {
      tl.play();
    };

    const onMouseLeave = () => {
      tl.reverse();
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 123 131"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ overflow: 'visible' }}
      >
        {/* Static Background Components of the SVG */}
        <g opacity="0.3">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 98.4141C0 106.835 5.78301 114.912 16.0769 120.867C37.4984 133.259 72.2811 133.259 93.7026 120.867C103.996 114.912 109.779 106.835 109.779 98.4141H82.3347C82.3347 102.625 79.4431 106.663 74.2963 109.64C63.5855 115.836 46.1939 115.836 35.4832 109.64C30.3364 106.663 27.445 102.625 27.445 98.4141H0Z" fill="black"/>
        </g>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.9219 45.1654V88.445L41.855 93.6412C43.2141 91.3715 45.4458 89.3098 48.3818 87.611C54.8049 83.8955 63.9895 82.2591 72.913 83.2403L78.0379 67.6433V24.3637C60.1907 22.4012 41.8212 25.6743 28.9755 33.1053C23.1032 36.5024 18.6398 40.626 15.9219 45.1654Z" fill="#F4BF4B"/>
        <path d="M29.2256 33.5381C41.8546 26.2324 59.9147 22.9628 77.5381 24.8135V67.5615L72.5625 82.7021C63.683 81.8044 54.5673 83.4561 48.1318 87.1787C45.2706 88.8342 43.0387 90.844 41.6133 93.083L16.4219 88.0352V45.3047C19.0922 40.9019 23.458 36.8747 29.2256 33.5381Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M78.0379 24.3637C60.1907 22.4012 41.8212 25.6743 28.9755 33.1053C23.1032 36.5024 18.6398 40.626 15.9219 45.1654L41.855 50.3616C43.2141 48.0919 45.4458 46.0301 48.3818 44.3317C54.8049 40.6162 63.9895 38.9795 72.913 39.9609L78.0379 24.3637Z" fill="#F4BF4B"/>
        <path d="M29.2256 33.5381C41.8143 26.2557 59.7993 22.9837 77.3691 24.7959L72.5625 39.4229C63.6831 38.5249 54.5672 40.176 48.1318 43.8984C45.271 45.5534 43.0397 47.5641 41.6143 49.8027L16.7266 44.8154C19.4186 40.6035 23.6723 36.7507 29.2256 33.5381Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.9219 88.4456V45.166L41.855 50.3622V93.6419L15.9219 88.4456Z" fill="black"/>
        <path d="M41.3545 50.7715V93.0312L16.4219 88.0352V45.7754L41.3545 50.7715Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M78.0311 67.6429V24.3633L72.9062 39.9605V83.2398L78.0311 67.6429Z" fill="#F4BF4B"/>
        <path d="M77.5312 67.5605L73.4062 80.1172V40.0381L77.5312 27.4854V67.5605Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M120.417 62.8024C117.82 57.7233 113.068 53.1009 106.594 49.3557C100.12 45.6104 92.1292 42.8616 83.3492 41.3594L67.7812 71.8082L120.417 62.8024Z" fill="#F4BF4B"/>
        <path d="M83.625 41.916C92.2152 43.423 100.018 46.1288 106.344 49.7881C112.499 53.3487 117.046 57.6905 119.649 62.4258L68.6807 71.1465L83.625 41.916Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M120.424 90.0665V62.8027L67.7812 71.8127L67.7885 99.0723L120.424 90.0665Z" fill="black"/>
        <path d="M119.924 89.6436L68.2871 98.4785L68.2812 72.2344L119.924 63.3955V89.6436Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.9062 82.123C12.9062 90.5445 18.6893 98.6209 28.9832 104.576C50.4046 116.968 85.1874 116.968 106.609 104.576C116.903 98.6209 122.686 90.5445 122.686 82.123H95.241C95.241 86.3338 92.3493 90.372 87.2025 93.3495C76.4918 99.5454 59.1002 99.5454 48.3894 93.3495C43.2426 90.372 40.3512 86.3338 40.3512 82.123H12.9062Z" fill="#F4BF4B"/>
        <path d="M39.8652 82.623C40.0846 86.8925 43.1045 90.8698 48.1387 93.7822C53.5881 96.9346 60.7058 98.4961 67.7959 98.4961C74.886 98.4961 82.0037 96.9346 87.4531 93.7822C92.4874 90.8698 95.5071 86.8925 95.7266 82.623H122.178C121.954 90.62 116.36 98.3568 106.358 104.143C95.7417 110.284 81.7824 113.369 67.7959 113.369C53.8094 113.369 39.85 110.284 29.2334 104.143C19.2315 98.3568 13.6382 90.62 13.4141 82.623H39.8652Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Small detail elements at the bottom */}
        <g opacity="0.3">
          <path fillRule="evenodd" clipRule="evenodd" d="M24.2753 85.4883L15.7344 90.429L24.2753 95.3697L27.6305 95.1841C27.6305 95.1841 29.4637 92.0791 32.816 90.429L24.2753 85.4883Z" fill="black"/>
        </g>
        <g opacity="0.3">
          <path fillRule="evenodd" clipRule="evenodd" d="M36.0097 95.3652L27.4688 100.306L36.0097 105.247L39.3649 105.061C39.3649 105.061 41.1981 101.956 44.5504 100.306L36.0097 95.3652Z" fill="black"/>
        </g>
        <g opacity="0.3">
          <path fillRule="evenodd" clipRule="evenodd" d="M52.33 100.078L43.7891 105.019L52.33 109.96L55.6852 109.774C55.6852 109.774 57.5187 106.669 60.8707 105.019L52.33 100.078Z" fill="black"/>
        </g>

        <path fillRule="evenodd" clipRule="evenodd" d="M122.671 98.3769H122.65C123.048 106.795 117.698 115.287 106.603 121.706C85.1783 134.1 50.3909 134.1 28.9666 121.706C17.8711 115.287 12.5219 106.795 12.9191 98.3769H12.8984V82.1133C12.8984 90.2428 18.2546 98.3722 28.9666 104.569C50.3909 116.962 85.1783 116.962 106.603 104.569C117.315 98.3722 122.671 90.2428 122.671 82.1133V98.3769Z" fill="black"/>
        <path d="M122.171 98.2422C122.157 98.2933 122.148 98.3463 122.15 98.4004C122.536 106.565 117.353 114.91 106.353 121.273C95.7345 127.416 81.7726 130.501 67.7842 130.501C53.7959 130.501 39.8348 127.416 29.2168 121.273C18.216 114.91 13.0337 106.566 13.4189 98.4004C13.4215 98.3463 13.4128 98.2933 13.3984 98.2422V88.2471C15.4346 94.4316 20.5717 100.291 28.7158 105.002C39.5219 111.253 53.6669 114.364 67.7842 114.364C81.9015 114.364 96.0464 111.253 106.853 105.002C114.997 100.291 120.135 94.4316 122.171 88.2471V98.2422Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Bars/Charts */}
        <path fillRule="evenodd" clipRule="evenodd" d="M27.6425 74.9502L19.1016 79.8909V90.2435L27.6425 95.1843L36.1832 90.2435V79.8909L27.6425 74.9502Z" fill="black"/>
        <path d="M35.6836 80.1787V89.9541L27.6416 94.6064L19.6016 89.9551V80.1777L27.6416 75.5273L35.6836 80.1787Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M36.1813 79.8906L27.6406 84.8314V95.184L36.1813 90.2432V79.8906Z" fill="#F4BF4B"/>
        <path d="M35.6816 89.9541L28.1406 94.3164V85.1182L35.6816 80.7568V89.9541Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M27.6425 74.9502L19.1016 79.8909L27.6425 84.8317L36.1832 79.8909L27.6425 74.9502Z" fill="#F4BF4B"/>
        <path d="M35.1846 79.8906L27.6416 84.2529L20.0986 79.8906L27.6416 75.5273L35.1846 79.8906Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M39.416 75.1348L30.875 80.0755V100.171L39.416 105.111L47.9567 100.171V80.0755L39.416 75.1348Z" fill="black"/>
        <path d="M47.457 80.3633V99.8818L39.415 104.533L31.375 99.8828V80.3633L39.416 75.7119L47.457 80.3633Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M47.9626 80.0762L39.4219 85.0169V105.112L47.9626 100.171V80.0762Z" fill="#F4BF4B"/>
        <path d="M47.4629 99.8818L39.9219 104.245V85.3037L47.4629 80.9424V99.8818Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M39.416 75.1348L30.875 80.0755L39.416 85.0162L47.9567 80.0755L39.416 75.1348Z" fill="#F4BF4B"/>
        <path d="M46.958 80.0752L39.415 84.4375L31.873 80.0752L39.416 75.7119L46.958 80.0752Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M55.6188 65.7637L47.0781 70.7044V104.852L55.6188 109.793L64.1598 104.852V70.7044L55.6188 65.7637Z" fill="black"/>
        <path d="M63.6602 70.9922V104.562L55.6182 109.215L47.5781 104.563V70.9912L55.6182 66.3408L63.6602 70.9922Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M64.1503 70.7051L55.6094 75.6458V109.794L64.1503 104.853V70.7051Z" fill="#F4BF4B"/>
        <path d="M63.6504 104.564L56.1094 108.926V75.9326L63.6504 71.5713V104.564Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M55.6188 65.7637L47.0781 70.7044L55.6188 75.6451L64.1598 70.7044L55.6188 65.7637Z" fill="#F4BF4B"/>
        <path d="M63.1611 70.7041L55.6182 75.0664L48.0752 70.7041L55.6182 66.3408L63.1611 70.7041Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>

        {/* --- ANIMATED ELEMENTS --- */}

        {/* Shadow Group */}
        <g ref={shadowRef} opacity="0.3">
          <path fillRule="evenodd" clipRule="evenodd" d="M57.1161 28.6368C60.0833 26.9205 64.9013 26.9205 67.8686 28.6368C70.8359 30.3534 70.8359 33.1405 67.8686 34.8571C64.9013 36.5734 60.0833 36.5734 57.1161 34.8571C54.1488 33.1405 54.1488 30.3534 57.1161 28.6368Z" fill="black"/>
        </g>

        {/* Ball Group */}
        <g ref={ballRef}>
          <path fillRule="evenodd" clipRule="evenodd" d="M62.5025 0C68.437 0 73.2551 4.82747 73.2551 10.7734C73.2551 16.7195 68.437 21.547 62.5025 21.547C56.568 21.547 51.75 16.7195 51.75 10.7734C51.75 4.82747 56.568 0 62.5025 0Z" fill="black"/>
          <path d="M62.5029 0.5C68.1602 0.500217 72.7549 5.10291 72.7549 10.7734C72.7548 16.4442 68.1602 21.0467 62.5029 21.0469C56.8455 21.0469 52.25 16.4443 52.25 10.7734C52.25 5.10277 56.8455 0.5 62.5029 0.5Z" stroke="#F4BF4B" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </div>
  );
}
