# Asean Labs — The Execution Layer for ENI Builders

A high-performance Web3 execution partner interface built with Next.js, GSAP, and COBE.

## Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (Pages Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) (ScrollTrigger, matchMedia)
- **Visuals**: [COBE](https://github.com/shuding/cobe) (WebGL Globe)
- **Typography**: [Geist](https://vercel.com/font) & Space Grotesk

## Setup Instructions

### 1. Prerequisites
- Node.js 18.x or later
- npm or yarn

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/farielloneil-collab/aseanlabs.git
cd aseanlabs
npm install
```

### 3. Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### 4. Build
To create a production build:
```bash
npm run build
```

### 5. Type Checking
To run TypeScript checks:
```bash
npm run typecheck
```

## Project Structure
- `src/components/`: Reusable UI components (Nav, Hero, Sections)
- `src/pages/`: Page-level components and routing
- `src/styles/`: Global CSS and Tailwind configurations
- `public/`: Static assets

## Design Principles
The project follows a "Neobrutalist" aesthetic with high-contrast yellow/black colors, heavy borders, and bold typography, optimized for the Namada/ENI ecosystem style.
