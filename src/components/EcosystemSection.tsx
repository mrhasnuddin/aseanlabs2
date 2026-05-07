import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

const PROJECTS = [
  { id: 't1', name: 'TeaDAO', tags: ['DAO'], descriptionKey: 'ecosystem.t1.desc', defaultDescription: "Drinking tea has become a way of life. The top-tier of Pu'er tea, a 2,700-year-old Pu'er tea asset, will be put on-chain to enhance the value creation of this tangible asset.", url: "https://x.com/TD_WEB3", logo: "/projects/t1.png", testimonyKey: 'ecosystem.t1.testimony', defaultTestimony: "\"Love how they're bridging real-world assets into Web3. It actually gives holding the token a tangible, grounded feeling.\"" },
  { id: 't2', name: 'Hotlink DAO', tags: ['Education', 'DAO'], descriptionKey: 'ecosystem.t2.desc', defaultDescription: "Hotlink DAO (Hotlink Global Education DAO) evolved from a leading blockchain education group in China and is dedicated to building a global Web3 educational super-system.", url: "https://x.com/Hotlink_web3", logo: "/projects/t2.png", testimonyKey: 'ecosystem.t2.testimony', defaultTestimony: "\"Finally an education DAO that feels structured. Their onboarding materials made transitioning our Web2 devs so much smoother.\"" },
  { id: 't3', name: 'Tofu Story', tags: ['GameFi'], descriptionKey: 'ecosystem.t3.desc', defaultDescription: "The game-powered Rewards Distribution Hub — Farm with your Pet TOFUs, earn points, and redeem for exclusive rewards like Stablecoins on LINE.", url: "https://x.com/TOFUStory_ENG", logo: "/projects/t3.png", testimonyKey: 'ecosystem.t3.testimony', defaultTestimony: "\"Super addictive loop. Farming with the pet TOFUs is chill, and actually being able to redeem for stablecoins is a huge plus.\"" },
  { id: 't4', name: 'Helios', tags: ['TradFi'], descriptionKey: 'ecosystem.t4.desc', defaultDescription: "Helios is a quantitative trading and liquidity infrastructure provider and the official market maker for the ENI ecosystem. Leveraging advanced algorithms, AI-driven execution, and institutional-grade risk controls.", url: "https://helios.financial/", logo: "/projects/t4.png", testimonyKey: 'ecosystem.t4.testimony', defaultTestimony: "\"Solid liquidity and tight spreads. We integrated their market-making infra last month and the execution has been flawless.\"" },
  { id: 't5', name: 'Yochi', tags: ['NFT'], descriptionKey: 'ecosystem.t5.desc', defaultDescription: "Yochis are pixel penguins living on ENI Island — each one uniquely styled with outfits, props, and vibes. No roles, no rules — just pure self-expression and good times.", url: "https://yochi.eni.top/", logo: "/projects/t5.png", testimonyKey: 'ecosystem.t5.testimony', defaultTestimony: "\"The vibes here are unmatched. My pixel penguin is my forever PFP—just a really fun, low-stress community to be part of.\"" },
  { id: 't6', name: 'ENIC', tags: ['RWA'], descriptionKey: 'ecosystem.t6.desc', defaultDescription: "A perpetual protocol defining financial civilization. Integrating RWA aggregation, decentralized prediction markets, and a unified consensus layer on the ENI Chain.", url: "https://enicweb3.vercel.app/", logo: "/projects/t6.png", testimonyKey: 'ecosystem.t6.testimony', defaultTestimony: "\"Their prediction market UI is clean. It's refreshing to see RWA aggregation done in a way that makes sense for retail users.\"" },
  { id: 't7', name: 'BlackRock Protocol', tags: ['RWA'], descriptionKey: 'ecosystem.t7.desc', defaultDescription: "BlackRock Protocol 🏛 | AI × RWA × CATC | Smart Finance powered by AI, real assets & Catcoin intelligence.", url: "https://x.com/BlackRock_ENI", logo: "/projects/t7.png", testimonyKey: 'ecosystem.t7.testimony', defaultTestimony: "\"AI plus RWAs sounded like buzzwords until I used their platform. The smart finance features are genuinely useful.\"" },
  { id: 't8', name: 'Cellula', tags: ['GameFi'], descriptionKey: 'ecosystem.t8.desc', defaultDescription: "$CELA - Gamify Asset Issuance Using vPoW Mechanism. Backed by BinanceLabs & OKX_ventures.", url: "https://factory.cellula.life/welcome", logo: "/projects/t8.png", testimonyKey: 'ecosystem.t8.testimony', defaultTestimony: "\"vPoW is an interesting concept for asset issuance. It feels much fairer than traditional mints, and the Binance Labs backing is huge.\"" },
  { id: 't9', name: 'MindKit', tags: ['AI'], descriptionKey: 'ecosystem.t9.desc', defaultDescription: "Plug Intelligence into Web3, One Command at a Time. An AI-native infrastructure that powers Web3 projects with agents and automation.", url: "https://x.com/mindkit_dao", logo: "/projects/t9.png", testimonyKey: 'ecosystem.t9.testimony', defaultTestimony: "\"MindKit's AI agents basically automate our entire Discord moderation and on-chain alerts now. Massive time saver for our team.\"" },
  { id: 't10', name: 'ZQBTC', tags: ['Infra'], descriptionKey: 'ecosystem.t10.desc', defaultDescription: "ZQBTC A computing-power–anchored Web3 infrastructure protocol. Bitcoin mining × on-chain financial systems | ENI Chain.", url: "https://x.com/ZQBTC_ENI", logo: "/projects/t10.png", testimonyKey: 'ecosystem.t10.testimony', defaultTestimony: "\"Anchoring infrastructure to Bitcoin mining power is brilliant. It brings a lot of stability and trust to the ecosystem.\"" },
  { id: 't11', name: 'Arcadia', tags: ['DeFi'], descriptionKey: 'ecosystem.t11.desc', defaultDescription: "Turning real-world consumption into on-chain assets. DeFi 4.0 powered by real consumer data. Building the future of intelligent commerce.", url: "https://x.com/DefiArcadi52651", logo: "/projects/t11.png", testimonyKey: 'ecosystem.t11.testimony', defaultTestimony: "\"Turning everyday consumption into DeFi assets is the holy grail. Arcadia is actually making this usable in the real world.\"" },
  { id: 't12', name: 'CyberCharge', tags: ['DePIN'], descriptionKey: 'ecosystem.t12.desc', defaultDescription: "CyberCharge has created the Next-Gen Global Power Matching Protocol. Enjoy smart #DePIN charging energy services powered by AI and consumer networks.", url: "https://x.com/CyberChargeWeb3", logo: "/projects/t12.png", testimonyKey: 'ecosystem.t12.testimony', defaultTestimony: "\"I travel a lot, and finding decentralized charging networks through them has been super convenient. Really cool DePIN use case.\"" },
  { id: 't13', name: 'Idle Glory', tags: ['GameFi'], descriptionKey: 'ecosystem.t13.desc', defaultDescription: "Idle action RPG built for warriors who grind less & win more – fast-paced", url: "https://x.com/idle_gIory", logo: "/projects/t13.png", testimonyKey: 'ecosystem.t13.testimony', defaultTestimony: "\"Perfect game for people with busy schedules. I can grind passively on my phone and still feel like I'm making real progression.\"" },
  { id: 't14', name: 'MonsterSaga', tags: ['GameFi'], descriptionKey: 'ecosystem.t14.desc', defaultDescription: "Monster Saga is a P2E turn-based RPG on BSC built around the original Sagas NFT IP. Players collect, battle, and upgrade Saga NFTs to earn MTS rewards in an on-chain gaming ecosystem.", url: "https://x.com/Monster_Saga", logo: "/projects/t14.png", testimonyKey: 'ecosystem.t14.testimony', defaultTestimony: "\"The turn-based combat actually requires strategy, not just P2W. Collecting the Saga NFTs has been surprisingly rewarding.\"" },
  { id: 't15', name: 'Aurayale', tags: ['GameFi'], descriptionKey: 'ecosystem.t15.desc', defaultDescription: "Aurayale is a collectible card battle game featuring strategic combat, progression, and NFT-powered rewards set in a sci-fi universe.", url: "https://x.com/MustaverseLab", logo: "/projects/t15.png", testimonyKey: 'ecosystem.t15.testimony', defaultTestimony: "\"The card art is stunning and the deck-building mechanics are deep. Reminds me of Hearthstone but with actual ownership.\"" },
  { id: 't16', name: 'PayGo', tags: ['PayFi'], descriptionKey: 'ecosystem.t16.desc', defaultDescription: "Agentic Payments infrastructure on ENI chain enabling native HTTP settlements for APIs, AI Agents, and MCP tools.", url: "https://www.paygo.ac/", logo: "/projects/t16.png", testimonyKey: 'ecosystem.t16.testimony', defaultTestimony: "\"We use PayGo for all our agentic payments now. The HTTP settlement layer just works—no more struggling with complex integrations.\"" },
  { id: 't17', name: 'FlowFi', tags: ['DAO', 'Infra'], descriptionKey: 'ecosystem.t17.desc', defaultDescription: "FlowFi is decentralized treasury infrastructure enabling governed capital coordination on-chain. It provides structured treasury management, programmable governance, and transparent capital execution for DAOs and collective investment networks.", url: "https://www.flowfidao.com/", logo: "/projects/t17.png", testimonyKey: 'ecosystem.t17.testimony', defaultTestimony: "\"Managing our DAO's treasury used to be a nightmare of spreadsheets. FlowFi made everything transparent and easily programmable.\"" },
  { id: 't18', name: 'Nikola', tags: ['AI', 'Infra', 'DeFi'], descriptionKey: 'ecosystem.t18.desc', defaultDescription: "AI-driven Web3 acceleration infrastructure embedding governance, capital efficiency, and structural coordination into category-leading ecosystems.", url: "https://www.nikola.network/", logo: "/projects/t18.png", testimonyKey: 'ecosystem.t18.testimony', defaultTestimony: "\"Their acceleration infra really helped us structure our governance tokenomics properly. Top-tier support for serious builders.\"" },
  { id: 't19', name: 'Mama Protocol', tags: ['DeFi', 'DAO'], descriptionKey: 'ecosystem.t19.desc', defaultDescription: "The identity layer of DeFi 4.0 — where capital meets structure. MAMA Protocol embeds governance, rewards, and responsibility into a verifiable on-chain identity system.", url: "https://www.mamaprotocol.io/", logo: "/projects/t19.png", testimonyKey: 'ecosystem.t19.testimony', defaultTestimony: "\"Verifiable on-chain identity is crucial for DeFi right now. Their approach balances user privacy with compliance perfectly.\"" },
];

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
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartPosRef = useRef<{ x: number, y: number } | null>(null);

  // Interaction state
  const dragTargetRef = useRef<{ index: number; offsetX: number; offsetY: number } | null>(null);
  const [hoveredProject, setHoveredProject] = useState<typeof PROJECTS[0] | null>(null);
  const { t } = useTranslation();
  
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
    if (isMobile) return;
    clickCountRef.current += 1;
    
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    
    if (clickCountRef.current >= 5) {
      triggerGravity();
      clickCountRef.current = 0;
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
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
    <section className="relative w-full overflow-hidden bg-[#F4BF4B] font-mono border-b-2 border-black" id="ecosystem">
      
      {/* Mobile View */}
      {isMobile ? (
        <div className="pt-32 pb-24 px-6 md:hidden">
          <div className="text-center mb-8">
            <h2 className="font-sans text-5xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground text-balance mb-4">
              {t('ecosystem.headlinePart1') !== 'ecosystem.headlinePart1' ? t('ecosystem.headlinePart1') : 'THRIVING'}<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--foreground)' }}>{t('ecosystem.headlineHighlight') !== 'ecosystem.headlineHighlight' ? t('ecosystem.headlineHighlight') : 'ECOSYSTEM'}</span>
            </h2>
            <p className="font-mono text-sm sm:text-base leading-relaxed text-foreground/80 mt-2">{t('ecosystem.subtitleMobile') !== 'ecosystem.subtitleMobile' ? t('ecosystem.subtitleMobile') : 'Building the future of ASEAN onchain.'}</p>
          </div>
          
          <div className="sticky top-4 z-20 mb-6">
            <div className="border-2 border-black bg-white shadow-[4px_4px_0_0_#000] flex">
              <div className="p-3 border-r-2 border-black bg-gray-100 flex items-center justify-center">
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
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-black transition-colors shadow-[2px_2px_0_0_#000] ${!selectedTag ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              {t('ecosystem.allTags') !== 'ecosystem.allTags' ? t('ecosystem.allTags') : 'All'}
            </button>
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-black transition-colors shadow-[2px_2px_0_0_#000] ${selectedTag === tag ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {filteredProjects.map((project) => (
              <a 
                key={project.id} 
                href={project.url} 
                target="_blank" 
                rel="noreferrer"
                className="block border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 relative border-2 border-black overflow-hidden shrink-0 bg-gray-50">
                    <Image src={project.logo} alt={project.name} fill className="object-contain p-2" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{project.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold border-2 border-black px-2 py-1 bg-[#F4BF4B] uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
                      {tag}
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
          className="hidden md:flex h-[100vh] relative flex-col items-center justify-center overflow-hidden"
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
          <div ref={centerPanelRef} className="z-10 text-center pointer-events-auto max-w-2xl px-6 flex flex-col items-center bg-[#F4BF4B]/95 p-8 border-2 border-black shadow-[8px_8px_0_0_#000]">
            <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground text-balance mb-4">
              {t('ecosystem.headlinePart1') !== 'ecosystem.headlinePart1' ? t('ecosystem.headlinePart1') : 'THRIVING'}<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--foreground)' }}>{t('ecosystem.headlineHighlight') !== 'ecosystem.headlineHighlight' ? t('ecosystem.headlineHighlight') : 'ECOSYSTEM'}</span>
            </h2>
            <p className="font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/80 mt-2 mb-8">{t('ecosystem.subtitle') !== 'ecosystem.subtitle' ? t('ecosystem.subtitle') : 'A comprehensive collection of applications, protocols, and partners building the future of ASEAN onchain.'}</p>
            
            <div className="flex gap-4 w-full max-w-lg justify-center items-center">
              <div className="flex-1 border-2 border-black bg-white shadow-[6px_6px_0_0_#000] flex focus-within:shadow-[2px_2px_0_0_#000] focus-within:translate-x-1 focus-within:translate-y-1 transition-all">
                <div className="p-4 border-r-2 border-black bg-gray-100 flex items-center justify-center">
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
                  className="px-6 py-4 border-2 border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase tracking-tight text-lg active:bg-gray-100"
                >
                  {t('ecosystem.reset') !== 'ecosystem.reset' ? t('ecosystem.reset') : 'Reset'}
                </button>
              )}
            </div>
            
            {/* Desktop Filter Tags */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-black transition-colors shadow-[2px_2px_0_0_#000] ${!selectedTag ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {t('ecosystem.allTags') !== 'ecosystem.allTags' ? t('ecosystem.allTags') : 'All'}
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-black transition-colors shadow-[2px_2px_0_0_#000] ${selectedTag === tag ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  {tag}
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
                  className={`absolute top-0 left-0 w-20 h-20 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0_0_#000] cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-100 ease-out z-20 ${!isVisible ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
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
            className={`fixed top-0 left-0 z-50 pointer-events-none max-w-sm border-2 border-black bg-white p-5 shadow-[8px_8px_0_0_#000] transition-opacity duration-200 ${hoveredProject ? 'opacity-100' : 'opacity-0'}`}
          >
            {hoveredProject && (
              <>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{hoveredProject.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hoveredProject.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold border-2 border-black px-1.5 py-0.5 bg-[#F4BF4B] uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium leading-snug mb-3 pb-3 border-b-2 border-black/10">{t(hoveredProject.descriptionKey) !== hoveredProject.descriptionKey ? t(hoveredProject.descriptionKey) : hoveredProject.defaultDescription}</p>
                <div className="bg-gray-100 p-3 border-l-4 border-black">
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
