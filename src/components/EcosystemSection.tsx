import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

import { PROJECTS } from '@/data/ecosystem';

const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

type PhysicsNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDragging: boolean;
};

export const EcosystemSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Physics state
  const nodesRef = useRef<PhysicsNode[]>([]);
  const animationFrameRef = useRef<number>();
  const [gravityActive, setGravityActive] = useState(false);
  const gravityActiveRef = useRef(false);
  const clickCountRef = useRef(0);
  const dragStartPosRef = useRef<{ x: number, y: number } | null>(null);

  // Interaction state
  const dragTargetRef = useRef<{ index: number; offsetX: number; offsetY: number } | null>(null);
  const [hoveredProject, setHoveredProject] = useState<typeof PROJECTS[0] | null>(null);
  const { t } = useTranslation();

  const getTagTranslation = (tag: string) => {
    const key = `ecosystem.tag.${tag.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const translated = t(key);
    return translated !== key ? translated : tag;
  };
  
  // Filter for mobile list and search logic
  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag ? p.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize physics nodes
  useEffect(() => {
    if (isMobile) return;

    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || window.innerHeight;

    // Distribute randomly but keep them inside bounds and avoid center panel
    nodesRef.current = PROJECTS.map((p, i) => {
      const radius = 40; // Approx 80px width/height for logo
      const maxSpeed = 1;
      
      let x, y;
      let attempts = 0;
      const centerRect = centerPanelRef.current?.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      do {
        x = radius + Math.random() * (width - radius * 2);
        y = radius + Math.random() * (height - radius * 2);
        attempts++;
        
        // Check if inside center panel
        if (centerRect && containerRect) {
          const relL = centerRect.left - containerRect.left - 20;
          const relR = relL + centerRect.width + 40;
          const relT = centerRect.top - containerRect.top - 20;
          const relB = relT + centerRect.height + 40;
          
          if (x > relL && x < relR && y > relT && y < relB) {
            continue; // Inside panel, try again
          }
        }
        break;
      } while (attempts < 50);

      return {
        id: p.id,
        x,
        y,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        radius,
        isDragging: false
      };
    });

    const updatePhysics = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = containerRef.current?.clientHeight || window.innerHeight;
      const gravity = gravityActiveRef.current ? 0.8 : 0;
      const bounce = 0.6; // Bounciness factor when gravity is on
      const friction = gravityActiveRef.current ? 0.98 : 1; // Slight friction if gravity is on

      nodesRef.current.forEach((node, i) => {
        if (node.isDragging) {
          // If dragging, velocity is determined by mouse movement, calculated in pointer events
          return; 
        }

        node.vy += gravity;

        node.vx *= friction;
        node.vy *= friction;

        node.x += node.vx;
        node.y += node.vy;

        // Boundary collision
        if (node.x - node.radius < 0) {
          node.x = node.radius;
          node.vx *= -1 * bounce;
        } else if (node.x + node.radius > width) {
          node.x = width - node.radius;
          node.vx *= -1 * bounce;
        }

        if (node.y - node.radius < 0) {
          node.y = node.radius;
          node.vy *= -1 * bounce;
        } else if (node.y + node.radius > height) {
          node.y = height - node.radius;
          node.vy *= -1 * bounce;
          // Friction on the floor
          if (gravityActiveRef.current) {
             node.vx *= 0.9;
          }
        }

        // Center Panel Collision (AABB vs Circle)
        if (centerPanelRef.current && containerRef.current) {
          const cpRect = centerPanelRef.current.getBoundingClientRect();
          const cRect = containerRef.current.getBoundingClientRect();
          
          const relL = cpRect.left - cRect.left;
          const relT = cpRect.top - cRect.top;
          const relR = relL + cpRect.width;
          const relB = relT + cpRect.height;
          
          // Find closest point on rect to circle center
          const closestX = Math.max(relL, Math.min(node.x, relR));
          const closestY = Math.max(relT, Math.min(node.y, relB));
          
          const dx = node.x - closestX;
          const dy = node.y - closestY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < node.radius) {
            const overlap = node.radius - distance;
            
            // If completely inside (distance 0), push to nearest edge
            if (distance < 0.1) {
              const toL = node.x - relL;
              const toR = relR - node.x;
              const toT = node.y - relT;
              const toB = relB - node.y;
              const min = Math.min(toL, toR, toT, toB);
              
              if (min === toL) { node.x = relL - node.radius; node.vx = -Math.abs(node.vx); }
              else if (min === toR) { node.x = relR + node.radius; node.vx = Math.abs(node.vx); }
              else if (min === toT) { node.y = relT - node.radius; node.vy = -Math.abs(node.vy); }
              else { node.y = relB + node.radius; node.vy = Math.abs(node.vy); }
            } else {
              const nx = dx / distance;
              const ny = dy / distance;
              
              // Push out
              node.x += nx * overlap;
              node.y += ny * overlap;
              
              // Reflect velocity
              const dot = node.vx * nx + node.vy * ny;
              if (dot < 0) {
                const b = gravityActiveRef.current ? 0.5 : 1.2; // Extra bounce when floating
                node.vx -= 2 * dot * nx * b;
                node.vy -= 2 * dot * ny * b;
              }
            }
          }
        }
      });

      // Node-to-node collision (simple circular push)
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = n1.radius + n2.radius;

          if (dist < minD && dist > 0) {
            const overlap = minD - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push apart
            const massRatio = 0.5;
            if (!n1.isDragging) {
              n1.x -= nx * overlap * massRatio;
              n1.y -= ny * overlap * massRatio;
              
              // Only transfer velocity if gravity is on, otherwise they just drift apart
              if (gravityActiveRef.current) {
                 n1.vx -= nx * overlap * 0.1;
                 n1.vy -= ny * overlap * 0.1;
              } else {
                 n1.vx -= nx * overlap * 0.01;
                 n1.vy -= ny * overlap * 0.01;
              }
            }
            if (!n2.isDragging) {
              n2.x += nx * overlap * massRatio;
              n2.y += ny * overlap * massRatio;

              if (gravityActiveRef.current) {
                 n2.vx += nx * overlap * 0.1;
                 n2.vy += ny * overlap * 0.1;
              } else {
                 n2.vx += nx * overlap * 0.01;
                 n2.vy += ny * overlap * 0.01;
              }
            }
          }
        }
      }

      // Max velocity cap when no gravity
      if (!gravityActiveRef.current) {
         nodesRef.current.forEach(node => {
            const speed = Math.sqrt(node.vx*node.vx + node.vy*node.vy);
            // If they are moving too fast (like after a reset or throw), slowly damp the speed down
            if (speed > 1.5 && !node.isDragging) {
               node.vx *= 0.95;
               node.vy *= 0.95;
            }
         });
      }

      // Update DOM
      nodesRef.current.forEach((node, i) => {
        const el = logosRef.current[i];
        if (el) {
          el.style.transform = `translate(${node.x - node.radius}px, ${node.y - node.radius}px)`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile]);

  // Pointer events for dragging
  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    if (isMobile) return;
    
    // Disable default drag behavior for the anchor/image
    e.preventDefault();
    
    const node = nodesRef.current[index];
    node.isDragging = true;
    // Calculate offset from center of node
    dragTargetRef.current = {
      index,
      offsetX: e.clientX - node.x,
      offsetY: e.clientY - node.y
    };
    
    // Reset velocity
    node.vx = 0;
    node.vy = 0;

    dragStartPosRef.current = { x: e.clientX, y: e.clientY };

    // Trigger hover tooltip manually if we want, but usually it's handled by mouseEnter
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragTargetRef.current) {
        // Handle tooltip positioning
        if (tooltipRef.current && hoveredProject) {
            tooltipRef.current.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`;
        }
        return;
    }
    
    const { index, offsetX, offsetY } = dragTargetRef.current;
    const node = nodesRef.current[index];
    
    // Calculate new position
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    
    // Calculate velocity for throw
    node.vx = newX - node.x;
    node.vy = newY - node.y;
    
    node.x = newX;
    node.y = newY;
  }, [hoveredProject]);

  const handlePointerUp = useCallback(() => {
    if (dragTargetRef.current) {
      const node = nodesRef.current[dragTargetRef.current.index];
      node.isDragging = false;
      dragTargetRef.current = null;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Easter Egg triggers
  const triggerGravity = () => {
    gravityActiveRef.current = true;
    setGravityActive(true);
  };

  const handleBackgroundClick = () => {
    if (isMobile || gravityActiveRef.current) return;
    clickCountRef.current += 1;
    
    if (clickCountRef.current >= 5) {
      triggerGravity();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (!isMobile && val.toLowerCase() === 'asean labs') {
      triggerGravity();
    }
  };

  const handleResetGravity = () => {
    gravityActiveRef.current = false;
    setGravityActive(false);
    clickCountRef.current = 0;
    // Give all nodes a fast random explosion velocity
    nodesRef.current.forEach(node => {
      node.vx = (Math.random() - 0.5) * 50;
      node.vy = (Math.random() - 0.5) * 50;
    });
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragStartPosRef.current) {
      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // If moved more than 5 pixels, it's a drag, not a click
      if (distance > 5) {
        e.preventDefault();
      }
    }
  };
  return (
    <section className="relative w-full overflow-hidden bg-canvas font-mono md:h-[100vh]" id="ecosystem">
      
      {/* Mobile View */}
      {isMobile ? (
        <div className="pt-32 pb-24 px-6 md:hidden">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="font-sans text-5xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground text-balance mb-4">
              {t('ecosystem.title1') !== 'ecosystem.title1' ? t('ecosystem.title1') : 'THRIVING'}<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--foreground)' }}>{t('ecosystem.title2') !== 'ecosystem.title2' ? t('ecosystem.title2') : 'ECOSYSTEM'}</span>
            </h2>
            <p className="font-mono text-sm sm:text-base leading-relaxed text-foreground/80 mt-2">{t('ecosystem.descMobile') !== 'ecosystem.descMobile' ? t('ecosystem.descMobile') : 'Building the future of ASEAN onchain.'}</p>
          </div>
          
          <div className="sticky top-4 z-20 mb-6 animate-fade-in">
            <div className="border-2 border-struct bg-relief shadow-[4px_4px_0_0_#000] flex">
              <div className="p-3 border-r-2 border-struct bg-gray-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder={t('ecosystem.searchPlaceholder') !== 'ecosystem.searchPlaceholder' ? t('ecosystem.searchPlaceholder') : 'Search ecosystem...'}
                className="w-full p-3 font-bold uppercase outline-none bg-transparent placeholder-black/30"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Mobile Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button 
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-struct transition-colors shadow-[2px_2px_0_0_#000] ${!selectedTag ? 'bg-struct text-relief' : 'bg-relief hover:bg-gray-100'}`}
            >
              {t('ecosystem.allTags') !== 'ecosystem.allTags' ? t('ecosystem.allTags') : 'All'}
            </button>
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-struct transition-colors shadow-[2px_2px_0_0_#000] ${selectedTag === tag ? 'bg-struct text-relief' : 'bg-relief hover:bg-gray-100'}`}
              >
                {getTagTranslation(tag)}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 animate-fade-in">
            {filteredProjects.map((project) => (
              <a 
                key={project.id} 
                href={project.url} 
                target="_blank" 
                rel="noreferrer"
                className="block border-2 border-struct bg-relief p-5 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 relative border-2 border-struct overflow-hidden shrink-0 bg-gray-50">
                    <Image src={project.logo} alt={project.name} fill className="object-contain p-2" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{project.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold border-2 border-struct px-2 py-1 bg-canvas uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
                      {getTagTranslation(tag)}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-80">{t(project.descriptionKey) !== project.descriptionKey ? t(project.descriptionKey) : project.defaultDescription}</p>
              </a>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Canvas View */
        <div 
          ref={containerRef}
          className="hidden md:flex h-full relative flex-col items-center justify-center overflow-hidden"
          onClick={handleBackgroundClick}
          onContextMenu={(e) => e.preventDefault()} // Disable right click context menu optionally
        >
          {/* Background Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--foreground) 1.5px, transparent 1.5px)',
              backgroundSize: '48px 48px',
              backgroundPosition: '0 0'
            }}
          />

          {/* Centered Content */}
          <div ref={centerPanelRef} className="z-10 text-center pointer-events-auto max-w-2xl px-6 flex flex-col items-center bg-relief p-8 border-2 border-struct shadow-[8px_8px_0_0_var(--color-struct)] animate-fade-in">
            <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tighter text-struct text-balance mb-4">
              {t('ecosystem.title1') !== 'ecosystem.title1' ? t('ecosystem.title1') : 'THRIVING'}<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-struct)' }}>{t('ecosystem.title2') !== 'ecosystem.title2' ? t('ecosystem.title2') : 'ECOSYSTEM'}</span>
            </h2>
            <p className="font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/80 mt-2 mb-8">{t('ecosystem.descDesktop') !== 'ecosystem.descDesktop' ? t('ecosystem.descDesktop') : 'A comprehensive collection of applications, protocols, and partners building the future of ASEAN onchain.'}</p>
            
            <div className="flex gap-4 w-full max-w-lg justify-center items-center">
              <div className="flex-1 border-2 border-struct bg-relief shadow-[6px_6px_0_0_#000] flex focus-within:shadow-[2px_2px_0_0_#000] focus-within:translate-x-1 focus-within:translate-y-1 transition-all">
                <div className="p-4 border-r-2 border-struct bg-gray-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder={t('ecosystem.searchPlaceholder') !== 'ecosystem.searchPlaceholder' ? t('ecosystem.searchPlaceholder') : 'Search ecosystem...'} 
                  className="w-full p-4 font-bold text-lg uppercase outline-none bg-transparent placeholder-black/30"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              {gravityActive && (
                <button 
                  onClick={handleResetGravity}
                  className="px-6 py-4 border-2 border-struct bg-relief shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase tracking-tight text-lg active:bg-gray-100"
                >
                  {t('ecosystem.reset') !== 'ecosystem.reset' ? t('ecosystem.reset') : 'Reset'}
                </button>
              )}
            </div>
            
            {/* Desktop Filter Tags */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-struct transition-colors shadow-[2px_2px_0_0_#000] ${!selectedTag ? 'bg-struct text-relief' : 'bg-relief hover:bg-gray-100'}`}
              >
                {t('ecosystem.allTags') !== 'ecosystem.allTags' ? t('ecosystem.allTags') : 'All'}
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-struct transition-colors shadow-[2px_2px_0_0_#000] ${selectedTag === tag ? 'bg-struct text-relief' : 'bg-relief hover:bg-gray-100'}`}
                >
                  {getTagTranslation(tag)}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Logos */}
          {(() => {
            const filteredIds = new Set(filteredProjects.map(p => p.id));
            return PROJECTS.map((project, index) => {
              const isVisible = filteredIds.has(project.id);
              
              return (
                <a
                  key={project.id}
                  ref={(el) => { logosRef.current[index] = el; }}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`absolute top-0 left-0 w-20 h-20 border-2 border-struct bg-relief flex items-center justify-center shadow-[4px_4px_0_0_#000] cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-100 ease-out z-20 ${!isVisible ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                  onPointerDown={(e) => handlePointerDown(e, index)}
                  onClick={handleLogoClick}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  draggable={false} // Disable native drag
                >
                  <div className="relative w-12 h-12">
                    <Image src={project.logo} alt={project.name} fill className="object-contain pointer-events-none" />
                  </div>
                </a>
              );
            });
          })()}

          {/* Fixed Tooltip */}
          <div 
            ref={tooltipRef}
            className={`fixed top-0 left-0 z-50 pointer-events-none max-w-sm border-2 border-struct bg-relief p-5 shadow-[8px_8px_0_0_#000] transition-opacity duration-200 ${hoveredProject ? 'opacity-100' : 'opacity-0'}`}
          >
            {hoveredProject && (
              <>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{hoveredProject.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hoveredProject.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold border-2 border-struct px-1.5 py-0.5 bg-canvas uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
                      {getTagTranslation(tag)}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium leading-snug mb-3 pb-3 border-b-2 border-struct/10">{t(hoveredProject.descriptionKey) !== hoveredProject.descriptionKey ? t(hoveredProject.descriptionKey) : hoveredProject.defaultDescription}</p>
                <div className="bg-gray-100 p-3 border-l-4 border-struct">
                  <p className="text-xs italic leading-tight text-gray-700">
                    {t(hoveredProject.testimonyKey) !== hoveredProject.testimonyKey ? t(hoveredProject.testimonyKey) : hoveredProject.defaultTestimony}
                  </p>
                </div>
              </>
            )}
          </div>

        </div>
      )}
    </section>
  );
};
