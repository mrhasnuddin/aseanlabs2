import React, { useImperativeHandle, useRef } from 'react';

/**
 * ASEAN Labs Service Icons
 * Loads SVGs from public/capabilities/ directory.
 * Colors: ASEAN Yellow (#F4BF4B) and Black.
 * 
 * When ready to animate, convert individual SVGs back to inline JSX
 * and add GSAP animations to the animateEntrance/animateScroll handlers.
 */

interface IconProps {
  className?: string;
  progress?: number;
}

export interface IconHandle {
  animateEntrance: () => void;
  animateScroll: (progress: number) => void;
  target: SVGSVGElement | null;
}

// Helper component that wraps an <img> tag in the IconHandle interface
function createSvgIcon(src: string, displayName: string) {
  const Component = React.forwardRef<IconHandle, IconProps>(({ className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      target: null, // No inline SVG to target for now
      animateEntrance: () => {},
      animateScroll: () => {},
    }));

    return (
      <div ref={containerRef} className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={src}
          alt={displayName}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          draggable={false}
        />
      </div>
    );
  });
  Component.displayName = displayName;
  return Component;
}

export const CapabilityTokenIcon = createSvgIcon('/capabilities/token.svg', 'TokenIcon');
export const BrandIcon = createSvgIcon('/capabilities/brand.svg', 'BrandIcon');
export const InfraIcon = createSvgIcon('/capabilities/infra.svg', 'InfraIcon');
export const TechnicalIcon = createSvgIcon('/capabilities/technical.svg', 'TechnicalIcon');
export const FundsIcon = createSvgIcon('/capabilities/funds.svg', 'FundsIcon');
export const CommunityIcon = createSvgIcon('/capabilities/community.svg', 'CommunityIcon');
