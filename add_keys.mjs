import fs from 'fs';

const enPath = 'src/locales/en.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const tags = ['AI', 'DePIN', 'Infrastructure', 'AppChain', 'RWA', 'Social', 'GameFi', 'DEX', 'Wallet', 'Payment', 'DAO', 'Education', 'TradFi', 'NFT', 'Infra', 'DeFi', 'PayFi'];
en['ecosystem.allTags'] = 'All';
tags.forEach(tag => {
  const key = `ecosystem.tag.${tag.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  en[key] = tag;
});

const projects = [
  { id: 't1', desc: "Drinking tea has become a way of life. The top-tier of Pu'er tea, a 2,700-year-old Pu'er tea asset, will be put on-chain to enhance the value creation of this tangible asset.", test: "\"Love how they're bridging real-world assets into Web3. It actually gives holding the token a tangible, grounded feeling.\"" },
  { id: 't2', desc: "Hotlink DAO (Hotlink Global Education DAO) evolved from a leading blockchain education group in China and is dedicated to building a global Web3 educational super-system.", test: "\"Finally an education DAO that feels structured. Their onboarding materials made transitioning our Web2 devs so much smoother.\"" },
  { id: 't3', desc: "The game-powered Rewards Distribution Hub — Farm with your Pet TOFUs, earn points, and redeem for exclusive rewards like Stablecoins on LINE.", test: "\"Super addictive loop. Farming with the pet TOFUs is chill, and actually being able to redeem for stablecoins is a huge plus.\"" },
  { id: 't4', desc: "Helios is a quantitative trading and liquidity infrastructure provider and the official market maker for the ENI ecosystem. Leveraging advanced algorithms, AI-driven execution, and institutional-grade risk controls.", test: "\"Solid liquidity and tight spreads. We integrated their market-making infra last month and the execution has been flawless.\"" },
  { id: 't5', desc: "Yochis are pixel penguins living on ENI Island — each one uniquely styled with outfits, props, and vibes. No roles, no rules — just pure self-expression and good times.", test: "\"The vibes here are unmatched. My pixel penguin is my forever PFP—just a really fun, low-stress community to be part of.\"" },
  { id: 't6', desc: "A perpetual protocol defining financial civilization. Integrating RWA aggregation, decentralized prediction markets, and a unified consensus layer on the ENI Chain.", test: "\"Their prediction market UI is clean. It's refreshing to see RWA aggregation done in a way that makes sense for retail users.\"" },
  { id: 't7', desc: "BlackRock Protocol 🏛 | AI × RWA × CATC | Smart Finance powered by AI, real assets & Catcoin intelligence.", test: "\"AI plus RWAs sounded like buzzwords until I used their platform. The smart finance features are genuinely useful.\"" },
  { id: 't8', desc: "$CELA - Gamify Asset Issuance Using vPoW Mechanism. Backed by BinanceLabs & OKX_ventures.", test: "\"vPoW is an interesting concept for asset issuance. It feels much fairer than traditional mints, and the Binance Labs backing is huge.\"" },
  { id: 't9', desc: "Plug Intelligence into Web3, One Command at a Time. An AI-native infrastructure that powers Web3 projects with agents and automation.", test: "\"MindKit's AI agents basically automate our entire Discord moderation and on-chain alerts now. Massive time saver for our team.\"" },
  { id: 't10', desc: "ZQBTC A computing-power–anchored Web3 infrastructure protocol. Bitcoin mining × on-chain financial systems | ENI Chain.", test: "\"Anchoring infrastructure to Bitcoin mining power is brilliant. It brings a lot of stability and trust to the ecosystem.\"" },
  { id: 't11', desc: "Turning real-world consumption into on-chain assets. DeFi 4.0 powered by real consumer data. Building the future of intelligent commerce.", test: "\"Turning everyday consumption into DeFi assets is the holy grail. Arcadia is actually making this usable in the real world.\"" },
  { id: 't12', desc: "CyberCharge has created the Next-Gen Global Power Matching Protocol. Enjoy smart #DePIN charging energy services powered by AI and consumer networks.", test: "\"I travel a lot, and finding decentralized charging networks through them has been super convenient. Really cool DePIN use case.\"" },
  { id: 't13', desc: "Idle action RPG built for warriors who grind less & win more – fast-paced", test: "\"Perfect game for people with busy schedules. I can grind passively on my phone and still feel like I'm making real progression.\"" },
  { id: 't14', desc: "Monster Saga is a P2E turn-based RPG on BSC built around the original Sagas NFT IP. Players collect, battle, and upgrade Saga NFTs to earn MTS rewards in an on-chain gaming ecosystem.", test: "\"The turn-based combat actually requires strategy, not just P2W. Collecting the Saga NFTs has been surprisingly rewarding.\"" },
  { id: 't15', desc: "Aurayale is a collectible card battle game featuring strategic combat, progression, and NFT-powered rewards set in a sci-fi universe.", test: "\"The card art is stunning and the deck-building mechanics are deep. Reminds me of Hearthstone but with actual ownership.\"" },
  { id: 't16', desc: "Agentic Payments infrastructure on ENI chain enabling native HTTP settlements for APIs, AI Agents, and MCP tools.", test: "\"We use PayGo for all our agentic payments now. The HTTP settlement layer just works—no more struggling with complex integrations.\"" },
  { id: 't17', desc: "FlowFi is decentralized treasury infrastructure enabling governed capital coordination on-chain. It provides structured treasury management, programmable governance, and transparent capital execution for DAOs and collective investment networks.", test: "\"Managing our DAO's treasury used to be a nightmare of spreadsheets. FlowFi made everything transparent and easily programmable.\"" },
  { id: 't18', desc: "AI-driven Web3 acceleration infrastructure embedding governance, capital efficiency, and structural coordination into category-leading ecosystems.", test: "\"Their acceleration infra really helped us structure our governance tokenomics properly. Top-tier support for serious builders.\"" },
  { id: 't19', desc: "The identity layer of DeFi 4.0 — where capital meets structure. MAMA Protocol embeds governance, rewards, and responsibility into a verifiable on-chain identity system.", test: "\"Verifiable on-chain identity is crucial for DeFi right now. Their approach balances user privacy with compliance perfectly.\"" }
];

projects.forEach(p => {
  en[`ecosystem.${p.id}.desc`] = p.desc;
  en[`ecosystem.${p.id}.testimony`] = p.test;
});

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log('Done adding ecosystem keys to en.json!');
