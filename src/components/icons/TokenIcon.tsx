import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props { className?: string; }

export function TokenIcon({ className }: Props) {
  const svgRef      = useRef<SVGSVGElement>(null);
  const coin1Ref    = useRef<SVGGElement>(null);
  const coin2Ref    = useRef<SVGGElement>(null);
  const circleRef   = useRef<SVGGElement>(null);
  const loopRef     = useRef<SVGGElement>(null);
  const starRef     = useRef<SVGGElement>(null);
  const chevronRef  = useRef<SVGGElement>(null);

  useEffect(() => {
    const trigger = { trigger: svgRef.current, start: 'top 80%' };
    const ctx = gsap.context(() => {
      // Two coins drop in from above, staggered
      gsap.from([coin1Ref.current, coin2Ref.current], {
        y: -40, opacity: 0, duration: 0.9, stagger: 0.18,
        ease: 'back.out(1.4)', scrollTrigger: trigger,
      });
      // Accent shapes fly in from their corners
      gsap.from(circleRef.current,  { x: -30, y: -20, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power3.out', scrollTrigger: trigger });
      gsap.from(loopRef.current,    { x:  30, y: -20, opacity: 0, duration: 0.7, delay: 0.4, ease: 'power3.out', scrollTrigger: trigger });
      gsap.from(starRef.current,    { x:  30, y:  20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out', scrollTrigger: trigger });
      gsap.from(chevronRef.current, { x: -30, y:  20, opacity: 0, duration: 0.7, delay: 0.6, ease: 'power3.out', scrollTrigger: trigger });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 165 109" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <filter id="tok_f3" x="46.6719" y="37.7207" width="70.6" height="71.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.6" dy="1.2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.957 0 0 0 0 0.749 0 0 0 0 0.294 0 0 0 1 0"/>
          <feBlend in2="BackgroundImageFix" result="eff1"/>
          <feBlend in="SourceGraphic" in2="eff1" result="shape"/>
        </filter>
        <filter id="tok_f4" x="51.6719" y="42.7207" width="60.6" height="61.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.6" dy="1.2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.957 0 0 0 0 0.749 0 0 0 0 0.294 0 0 0 1 0"/>
          <feBlend in2="BackgroundImageFix" result="eff2"/>
          <feBlend in="SourceGraphic" in2="eff2" result="shape"/>
        </filter>
        <filter id="tok_f5" x="46.6719" y="7.7207" width="70.6" height="71.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.6" dy="1.2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.957 0 0 0 0 0.749 0 0 0 0 0.294 0 0 0 1 0"/>
          <feBlend in2="BackgroundImageFix" result="eff3"/>
          <feBlend in="SourceGraphic" in2="eff3" result="shape"/>
        </filter>
        <filter id="tok_f6" x="51.6719" y="12.7207" width="60.6" height="61.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.6" dy="1.2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.957 0 0 0 0 0.749 0 0 0 0 0.294 0 0 0 1 0"/>
          <feBlend in2="BackgroundImageFix" result="eff4"/>
          <feBlend in="SourceGraphic" in2="eff4" result="shape"/>
        </filter>
        <clipPath id="tok_clip0">
          <rect width="36.3256" height="23.8473" fill="white" transform="translate(63.6719 65.7207)"/>
        </clipPath>
        <clipPath id="tok_clip1">
          <rect width="27.2864" height="29.8436" fill="white" transform="translate(69.6719 27.7207)"/>
        </clipPath>
      </defs>

      {/* Top-left small circle — flies in from top-left */}
      <g ref={circleRef}>
        <path d="M14.0592 22.9482C7.77082 22.9482 2.67303 28.046 2.67303 34.3344C2.67303 40.6227 7.77082 45.7205 14.0592 45.7205C20.3475 45.7205 25.4453 40.6227 25.4453 34.3344C25.4453 28.046 20.3475 22.9482 14.0592 22.9482ZM14.0592 25.7948C18.7755 25.7948 22.5988 29.618 22.5988 34.3344C22.5988 39.0506 18.7755 42.874 14.0592 42.874C9.34291 42.874 5.51957 39.0506 5.51957 34.3344C5.51957 29.618 9.34291 25.7948 14.0592 25.7948ZM14.0592 32.9111C13.2731 32.9111 12.6359 33.5483 12.6359 34.3344C12.6359 35.1205 13.2731 35.7576 14.0592 35.7576C14.8453 35.7576 15.4824 35.1205 15.4824 34.3344C15.4824 33.5483 14.8453 32.9111 14.0592 32.9111Z" fill="#F4BF4B"/>
        <path d="M14.0596 23.4482C8.04749 23.4482 3.17307 28.322 3.17285 34.334C3.17285 40.3462 8.04736 45.2207 14.0596 45.2207C20.0716 45.2205 24.9453 40.3461 24.9453 34.334C24.9451 28.3221 20.0715 23.4485 14.0596 23.4482ZM14.0596 25.2949C19.0518 25.2951 23.0984 29.3418 23.0986 34.334C23.0986 39.3263 19.0519 43.3738 14.0596 43.374C9.06716 43.374 5.01953 39.3264 5.01953 34.334C5.01975 29.3417 9.0673 25.2949 14.0596 25.2949ZM14.0596 33.4111C13.5498 33.4111 13.136 33.8242 13.1357 34.334C13.1357 34.8439 13.5496 35.2578 14.0596 35.2578C14.5693 35.2576 14.9824 34.8438 14.9824 34.334C14.9822 33.8244 14.5692 33.4113 14.0596 33.4111Z" stroke="black"/>
      </g>

      {/* Top-right loop arrows — flies in from top-right */}
      <g ref={loopRef}>
        <path d="M147.848 13.9498C153.921 15.5809 157.522 21.8265 155.891 27.8997L150.393 26.423C151.208 23.3864 149.408 20.2636 146.371 19.4481C143.335 18.6326 140.212 20.4331 139.396 23.4697L133.898 21.993C135.529 15.9199 141.775 12.3188 147.848 13.9498ZM161.798 5.90661C160.167 11.9798 153.921 15.5809 147.848 13.9498C141.775 12.3188 138.174 6.07317 139.805 0L145.303 1.47665C144.487 4.51324 146.288 7.63604 149.325 8.45157C152.361 9.26709 155.484 7.46654 156.299 4.42995L161.798 5.90661Z" fill="#F4BF4B"/>
        <path d="M147.718 14.4322C153.363 15.9481 156.773 21.6337 155.526 27.2839L150.984 26.0642C151.565 22.9208 149.641 19.8084 146.501 18.9649C143.36 18.1217 140.136 19.8516 139.064 22.8628L134.523 21.6432C136.274 16.1288 142.073 12.9165 147.718 14.4322ZM144.711 1.83549C144.131 4.9788 146.054 8.09093 149.194 8.93459C152.335 9.77807 155.559 8.04826 156.632 5.03691L161.173 6.25653C159.421 11.7711 153.622 14.9823 147.977 13.4664C142.333 11.9502 138.923 6.26582 140.17 0.615869L144.711 1.83549Z" stroke="black"/>
      </g>

      {/* Bottom-right star — flies in from bottom-right */}
      <g ref={starRef}>
        <path d="M149.961 79.9208L151.84 74.4897L155.561 75.7774L153.682 81.2085L158.851 78.6971L160.572 82.2387L155.403 84.7501L160.834 86.6295L159.546 90.3505L154.115 88.4711L156.626 93.6404L153.085 95.361L150.573 90.1917L148.694 95.6228L144.973 94.3351L146.852 88.9041L141.683 91.4154L139.962 87.8738L145.132 85.3624L139.701 83.483L140.988 79.762L146.419 81.6414L143.908 76.4722L147.45 74.7515L149.961 79.9208Z" fill="#F4BF4B"/>
        <path d="M147.218 75.4198L150.039 81.225L152.149 75.1261L154.925 76.0868L152.815 82.1857L158.62 79.3653L159.904 82.0075L154.098 84.8279L160.197 86.9384L159.237 89.7144L153.138 87.6039L155.958 93.4091L153.316 94.6928L150.496 88.8875L148.385 94.9864L145.609 94.0257L147.72 87.9269L141.914 90.7472L140.631 88.105L146.436 85.2847L140.337 83.1741L141.298 80.3981L147.397 82.5087L144.576 76.7034L147.218 75.4198Z" stroke="black"/>
      </g>

      {/* Bottom coin — drops in first */}
      <g ref={coin2Ref}>
        <g filter="url(#tok_f3)">
          <circle cx="81.6719" cy="72.7207" r="35" fill="#F4BF4B"/>
          <circle cx="81.6719" cy="72.7207" r="34.5" stroke="black"/>
        </g>
        <g filter="url(#tok_f4)">
          <circle cx="81.6719" cy="72.7207" r="30" fill="#F4BF4B"/>
          <circle cx="81.6719" cy="72.7207" r="29.5" stroke="black"/>
        </g>
        <g clipPath="url(#tok_clip0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M94.3733 65.708C93.7555 65.7074 93.4399 66.1358 93.3447 66.7036C93.0293 68.5847 92.4115 70.3825 91.4653 72.0413C90.5765 73.5994 89.3695 74.958 87.8763 75.9461C87.4136 76.2522 86.9623 76.5133 86.4869 76.7919C86.0116 77.0705 85.9789 77.312 85.9748 77.7758C85.9704 78.2663 86.2687 78.4806 86.6695 78.7097C88.1283 79.5429 89.2065 80.3731 90.258 81.6953C90.9002 82.5025 91.4334 83.3472 91.8798 84.281C92.5343 85.6499 92.9754 87.0802 93.2229 88.5965C93.2843 88.9724 93.472 89.267 93.7799 89.4517C93.9683 89.5646 94.1793 89.5819 94.4066 89.5819H99.5177C99.7053 89.5819 99.8921 89.5241 100.001 89.3863C100.13 89.2224 100.145 89.0071 100.107 88.794C99.6583 86.2943 98.3658 84.0787 96.6055 82.2658C95.5072 81.1347 94.2464 80.2046 92.8507 79.4654C91.1896 78.5858 89.4084 77.9937 87.5484 77.7295C90.2961 77.2701 93.1769 76.0613 95.5012 74.1137C97.3608 72.5553 98.8326 70.5581 99.6491 68.2697C99.8712 67.6474 100.035 67.0445 100.14 66.3925C100.196 66.044 99.9603 65.714 99.5799 65.7136L94.3733 65.708Z" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M69.5173 65.708C70.1351 65.7074 70.4508 66.1358 70.5459 66.7036C70.8613 68.5847 71.4791 70.3825 72.4253 72.0413C73.3141 73.5994 74.5212 74.958 76.0143 75.9461C76.477 76.2522 76.9284 76.5133 77.4037 76.7919C77.879 77.0705 77.9117 77.312 77.9158 77.7758C77.9202 78.2663 77.6219 78.4806 77.2211 78.7097C75.7623 79.5429 74.6842 80.3731 73.6326 81.6953C72.9904 82.5025 72.4572 83.3472 72.0108 84.281C71.3563 85.6499 70.9152 87.0802 70.6677 88.5965C70.6064 88.9724 70.4186 89.267 70.1107 89.4517C69.9224 89.5646 69.7114 89.5819 69.484 89.5819H64.3729C64.1853 89.5819 63.9985 89.5241 63.8899 89.3863C63.761 89.2224 63.7457 89.0071 63.7839 88.794C64.2324 86.2943 65.5249 84.0787 67.2851 82.2658C68.3835 81.1347 69.6442 80.2046 71.0399 79.4654C72.701 78.5858 74.4822 77.9937 76.3422 77.7295C73.5945 77.2701 70.7138 76.0613 68.3894 74.1137C66.5298 72.5553 65.058 70.5581 64.2415 68.2697C64.0194 67.6474 63.8552 67.0445 63.7504 66.3925C63.6943 66.044 63.9303 65.714 64.3107 65.7136L69.5173 65.708Z" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M84.8718 65.709C85.4047 65.709 85.671 66.1814 85.6447 66.6892C85.575 68.0386 85.4245 69.3544 85.1482 70.6769C84.6825 72.905 83.7569 75.0806 82.2835 76.8362L81.9372 77.2489C81.0656 76.2667 80.3493 75.1932 79.8058 73.9969C79.3799 73.0593 79.0583 72.1131 78.8219 71.1114C78.478 69.6548 78.2898 68.0833 78.2199 66.5867C78.1971 66.0971 78.5137 65.709 79.039 65.709H84.8718ZM79.8669 66.6748C79.48 66.6748 79.1679 66.9821 79.1948 67.3681C79.3393 69.4412 80.152 74.2433 82.0341 75.4983C83.8937 73.9669 84.6832 69.2584 84.8625 67.171C84.8857 66.9 84.669 66.6748 84.3969 66.6748H79.8669Z" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M81.9408 78.097C83.1915 79.5312 84.0623 81.0248 84.6639 82.8017C84.9676 83.7181 85.1877 84.6195 85.3344 85.5747C85.4937 86.6123 85.6021 87.6197 85.6407 88.6704C85.658 89.1426 85.2974 89.5741 84.7923 89.5745L79.0731 89.5766C78.7154 89.5766 78.4281 89.3175 78.309 89.0174C78.2398 88.843 78.2188 88.6567 78.2352 88.4736L78.3477 87.2202C78.6542 83.8033 79.6265 80.6883 81.9408 78.097Z" fill="black"/>
        </g>
      </g>

      {/* Top coin — drops in slightly after */}
      <g ref={coin1Ref}>
        <g filter="url(#tok_f5)">
          <circle cx="81.6719" cy="42.7207" r="35" fill="#F4BF4B"/>
          <circle cx="81.6719" cy="42.7207" r="34.5" stroke="black"/>
        </g>
        <g filter="url(#tok_f6)">
          <circle cx="81.6719" cy="42.7207" r="30" fill="#F4BF4B"/>
          <circle cx="81.6719" cy="42.7207" r="29.5" stroke="black"/>
        </g>
        <g clipPath="url(#tok_clip1)">
          <path d="M69.6719 47.0839V56.479C69.6719 57.1733 70.3135 57.6878 70.9923 57.5391L92.1817 52.84C93.3161 52.5889 93.3161 50.974 92.1817 50.7229L70.9923 46.0238C70.3135 45.875 69.6719 46.3896 69.6719 47.0839Z" fill="black"/>
          <path d="M92.1693 32.4415L70.9923 27.7455C70.3135 27.5967 69.6719 28.1112 69.6719 28.8056V38.2007C69.6719 38.895 70.3135 39.4095 70.9923 39.2607L92.1724 34.5617C93.3068 34.3106 93.3068 32.6957 92.1724 32.4446L92.1693 32.4415Z" fill="black"/>
          <path d="M95.6355 36.8873L74.4524 41.5833C73.3179 41.8343 73.3179 43.4492 74.4524 43.7003L95.6386 48.3963C96.3175 48.5451 96.9591 48.0306 96.9591 47.3362V37.9442C96.9591 37.2499 96.3144 36.7354 95.6355 36.8842V36.8873Z" fill="black"/>
        </g>
      </g>

      {/* Bottom-left chevrons — flies in from bottom-left */}
      <g ref={chevronRef}>
        <path d="M26.4554 87.8781L17.1449 92.8605L22.0827 102.087L17.6358 104.467L13.3331 96.4274L15.952 87.7783L24.0755 83.431L26.4554 87.8781Z" fill="#F4BF4B"/>
        <path d="M14.1382 87.2419L11.5265 95.8671L3.47874 100.174L1.09876 95.7272L10.318 90.7934L5.33961 81.4907L9.78674 79.1108L14.1382 87.2419Z" fill="#F4BF4B"/>
        <path d="M25.7786 87.673L16.4683 92.6554L21.4058 101.882L17.8405 103.79L13.872 96.3741L16.371 88.1211L23.8706 84.1076L25.7786 87.673ZM13.5998 87.2953L11.1082 95.524L3.68406 99.497L1.77605 95.9317L10.995 90.9981L6.01644 81.6952L9.58176 79.7871L13.5998 87.2953Z" stroke="black"/>
      </g>
    </svg>
  );
}
