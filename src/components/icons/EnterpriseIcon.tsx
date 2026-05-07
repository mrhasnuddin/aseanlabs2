import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface EnterpriseIconProps {
  className?: string;
}

export function EnterpriseIcon({ className }: EnterpriseIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  // Load the actual SVG file content
  useEffect(() => {
    fetch('/cards/enterprise.svg')
      .then((res) => res.text())
      .then((text) => {
        // The middle ball is now a simple <circle> element.
        // Add an id to it so GSAP can target it.
        // Target: <circle cx="66" cy="58.2715" r="17.55"
        const modified = text.replace(
          '<circle cx="66" cy="58.2715"',
          '<circle id="enterprise-ball" cx="66" cy="58.2715"'
        );
        setSvgContent(modified);
      });
  }, []);

  // Attach GSAP animation once SVG is loaded
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const canHover = window.matchMedia('(hover: hover)').matches;
    if (!canHover) return;

    // Wait a tick for the DOM to render the injected SVG
    const timer = setTimeout(() => {
      const container = containerRef.current;
      const ball = container?.querySelector('#enterprise-ball') as SVGCircleElement | null;

      if (!container || !ball) return;

      // The circle center is at cx=66, cy=58.2715 in SVG coords
      const svgOriginX = 66;
      const svgOriginY = 58.2715;

      let pulseTween: gsap.core.Tween | null = null;

      const onMouseEnter = () => {
        gsap.killTweensOf(ball);
        pulseTween = gsap.to(ball, {
          scale: 1.2,
          duration: 0.8,
          ease: 'sine.inOut',
          svgOrigin: `${svgOriginX} ${svgOriginY}`,
          yoyo: true,
          repeat: -1,
        });
      };

      const onMouseLeave = () => {
        if (pulseTween) {
          pulseTween.kill();
          pulseTween = null;
        }
        gsap.to(ball, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          svgOrigin: `${svgOriginX} ${svgOriginY}`,
        });
      };

      container.addEventListener('mouseenter', onMouseEnter);
      container.addEventListener('mouseleave', onMouseLeave);

      // Store cleanup reference
      (container as any).__enterpriseCleanup = () => {
        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
        gsap.killTweensOf(ball);
      };
    }, 50);

    return () => {
      clearTimeout(timer);
      const container = containerRef.current;
      if (container && (container as any).__enterpriseCleanup) {
        (container as any).__enterpriseCleanup();
      }
    };
  }, [svgContent]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: 'visible' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
