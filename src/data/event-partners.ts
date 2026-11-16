import assets from './event-partner-assets.json';

export type EventCredit = { name: string; role: string; url?: string; logo?: string; theme?: string; logoWidth?: number; logoHeight?: number };
const partnerAssets: Omit<EventCredit, 'role'>[] = assets;
function credit(name: string, role: string): EventCredit {
  const asset = partnerAssets.find((item) => item.name === name);
  return { ...(asset || {}), name, role };
}
const eni: EventCredit = { name: 'ENI', role: 'Event organiser', url: 'https://eni.top/', logo: '/partners/mono/eni.svg', theme: 'light' };

// Roles are event-specific. An organiser, a featured initiative, and a project
// represented by our founder are not interchangeable partnership claims.
export const EVENT_CREDITS: Record<string, EventCredit[]> = {
  'aisem-selangor': [credit('MyDAC Malaysia', 'Featured talent-building initiative'), credit('LEJIEND', 'Featured talent-building initiative')],
  changsha: [eni],
  hangzhou: [eni, credit('DAOaaS', 'Presented platform')],
  bali: [credit('Pionex', 'Co-organising partner'), credit('9Bit', 'Co-organising partner'), credit('HODL', 'Co-organising partner'), credit('Kripto101', 'Co-organising partner')],
  'chain-of-trust': [credit('CCACC', 'Event host'), credit('Fableration', 'Event host')],
  gala: [credit('MySekolahKripto', 'Co-host')],
  'paygo-meetup': [credit('PayGo', 'Co-host'), credit('Finweek KL', 'Joint-venture partner')],
  'nova-mexc': [credit('MySekolahKripto', 'Event organiser'), credit('MEXC', 'Event partner')],
  'blockchain-evolution': [credit('MySekolahKripto', 'Event host'), credit('EUFT', 'Event partner'), credit('GameSpace', 'Event partner · represented project')],
};
