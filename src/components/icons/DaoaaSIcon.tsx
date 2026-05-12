import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function DaoaaSIcon({ className, style, trackRef }: { className?: string, style?: React.CSSProperties, trackRef?: React.RefObject<HTMLElement | null> }) {
  const containerRef = useRef<SVGSVGElement>(null);
  
  const star1Ref = useRef<SVGGElement>(null);
  const star2Ref = useRef<SVGGElement>(null);
  const asteriskRef = useRef<SVGGElement>(null);
  const coinRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // 1. Stars blinking with different timings
    if (star1Ref.current) {
      gsap.to(star1Ref.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        transformOrigin: "center center"
      });
    }
    if (star2Ref.current) {
      gsap.to(star2Ref.current, {
        scale: 1.3,
        opacity: 0.4,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        transformOrigin: "center center",
        delay: 0.3
      });
    }

    // 2. Asterisk spinning
    if (asteriskRef.current) {
      gsap.to(asteriskRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center"
      });
    }

    // 3. Mouse tracking for the coin
    const container = containerRef.current;
    if (!container || !coinRef.current) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    const trackEl = trackRef?.current ?? window;

    const xTo = gsap.quickTo(coinRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(coinRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent | Event) => {
      const mouseEvent = e as MouseEvent;
      
      let x = 0;
      let y = 0;

      if (trackEl === window) {
        x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
        y = (mouseEvent.clientY / window.innerHeight) * 2 - 1;
      } else {
        const rect = (trackEl as HTMLElement).getBoundingClientRect();
        x = ((mouseEvent.clientX - rect.left) / rect.width) * 2 - 1;
        y = ((mouseEvent.clientY - rect.top) / rect.height) * 2 - 1;
      }

      // Movement range limit
      const range = 15; 
      xTo(x * range);
      yTo(y * range);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    trackEl.addEventListener("mousemove", handleMouseMove);
    if (trackEl !== window) {
      trackEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      trackEl.removeEventListener("mousemove", handleMouseMove);
      if (trackEl !== window) {
        trackEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [trackRef]);

  return (
    <svg 
      ref={containerRef} 
      className={className} 
      style={{ overflow: 'visible', ...style }}
      width="174" 
      height="123" 
      viewBox="0 0 174 123" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Star 1 (Small) */}
      <g ref={star1Ref}>
        <path d="M32.1926 35.0117C31.2427 33.1521 31.22 30.9435 32.1338 29.0768C30.2802 30.0167 28.0714 30.0248 26.1987 29.1011C27.1486 30.9609 27.1711 33.1699 26.2568 35.0366C28.1107 34.0964 30.3197 34.0877 32.1926 35.0117Z" fill="currentColor" className="text-struct" stroke="currentColor" strokeWidth="0.68128"/>
      </g>
      
      {/* Star 2 (Big) */}
      <g ref={star2Ref}>
        <path d="M39.6205 23.5211C37.9575 20.2663 37.9189 16.4005 39.5188 13.1331C36.2745 14.7786 32.4081 14.7936 29.1304 13.1768C30.7926 16.4316 30.8319 20.2966 29.2321 23.5634C32.4767 21.9179 36.3426 21.904 39.6205 23.5211Z" fill="currentColor" className="text-struct" stroke="currentColor" strokeWidth="1.1923"/>
      </g>

      {/* Asterisk */}
      <g ref={asteriskRef}>
        <path d="M123.992 89.3963L126.812 95.2016L128.923 89.1027L131.699 90.0633L129.588 96.1622L135.393 93.3419L136.677 95.9841L130.872 98.8044L136.971 100.915L136.01 103.691L129.911 101.58L132.732 107.386L130.089 108.669L127.269 102.864L125.158 108.963L122.382 108.002L124.493 101.903L118.688 104.724L117.404 102.082L123.209 99.2612L117.11 97.1507L118.071 94.3747L124.17 96.4852L121.35 90.68L123.992 89.3963Z" fill="currentColor" className="text-struct" stroke="currentColor"/>
      </g>

      {/* Left Arrow */}
      <path d="M14.0463 72.5226C12.5558 79.3954 13.3372 86.83 16.9867 93.5185C23.3907 105.255 36.4507 111.001 48.9265 108.714L47.645 101.683C42.8813 102.558 37.9629 101.907 33.5908 99.8228C29.2188 97.7385 25.6162 94.3274 23.2966 90.0755C20.6111 85.1538 19.9769 79.6696 20.9904 74.5638L35.1125 78.715L22.7177 55.9995L0.0022203 68.3943L14.0463 72.5226Z" fill="currentColor" className="text-struct"/>
      <path d="M24.5182 58.6781L36.0953 79.895L22.6067 75.93L22.5001 76.4665C21.4657 81.6781 22.112 87.2825 24.8577 92.3146C27.2277 96.6589 30.9088 100.144 35.3758 102.274C39.6922 104.331 44.5297 105.023 49.2423 104.26L50.3437 110.307C38.2228 112.319 25.6379 106.665 19.4253 95.2788C15.8377 88.7037 15.0684 81.3926 16.5354 74.6283L16.6336 74.1742L3.30134 70.2552L24.5182 58.6781Z" fill="currentColor" className="text-struct" stroke="currentColor"/>
      
      {/* Right Arrow */}
      <path d="M159.407 55.6658C160.82 48.7767 159.956 41.3513 156.231 34.7041C149.696 23.0402 136.573 17.4406 124.123 19.8676L125.484 26.8836C130.237 25.9552 135.163 26.551 139.558 28.5862C143.953 30.6213 147.593 33.9919 149.96 38.2176C152.701 43.1089 153.396 48.5856 152.44 53.7025L138.273 49.7097L150.921 72.2849L173.496 59.6366L159.407 55.6658Z" fill="currentColor" className="text-struct"/>
      <path d="M149.097 69.6266L137.283 48.5407L150.815 52.3544L150.916 51.8167C151.892 46.5938 151.183 40.997 148.381 35.996C145.963 31.6785 142.243 28.2349 137.752 26.1555C133.413 24.1462 128.568 23.5091 123.864 24.3242L122.695 18.2897C134.793 16.1425 147.44 21.6557 153.78 32.9712C157.441 39.5057 158.292 46.8077 156.901 53.588L156.808 54.0432L170.183 57.8127L149.097 69.6266Z" fill="currentColor" className="text-struct" stroke="currentColor"/>

      {/* DAOaaS Coin */}
      <g ref={coinRef}>
        <circle cx="83.2109" cy="61.1357" r="35" fill="currentColor" className="text-struct"/>
        <circle cx="82.2109" cy="59.1357" r="34.5" fill="currentColor" className="text-canvas stroke-struct" strokeWidth="2" stroke="currentColor"/>
        <path d="M91.9046 63.5207L80.1314 43.077L80.2084 43L87.6465 48.0504L99.3757 68.428H78.5909C78.5689 68.318 78.624 68.252 78.668 68.164C79.2621 66.8876 80.3294 65.2041 81.0886 63.9718C81.1767 63.8178 81.2647 63.6527 81.3857 63.5317H91.9156L91.9046 63.5207Z" fill="currentColor" className="text-struct"/>
        <path d="M88.8171 61.7053H83.1946L77.9571 52.6608L77.8361 52.5948L66.0078 73.1155L66.591 64.3461L66.69 63.906L78.3422 43.6934L88.8171 61.7053Z" fill="currentColor" className="text-struct"/>
        <path d="M75.452 70.1878H99.1196C98.7895 70.4409 98.3494 70.6279 97.9642 70.815C95.6536 71.9373 93.332 73.0266 91.0433 74.1819H67.5078L77.8507 56.1699L80.7115 61.0443L75.452 70.1878Z" fill="currentColor" className="text-struct"/>
      </g>
    </svg>
  );
}
