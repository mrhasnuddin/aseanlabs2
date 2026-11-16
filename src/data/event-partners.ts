import assets from './event-partner-assets.json';

export type EventCredit = { name: string; role: string; url?: string; logo?: string; theme?: string; logoWidth?: number; logoHeight?: number };
const partnerAssets: Omit<EventCredit, 'role'>[] = assets;
function credit(name: string, role: string): EventCredit {
  const asset = partnerAssets.find((item) => item.name === name);
  return { ...(asset || {}), name, role };
}
const eni: EventCredit = { name: 'ENI', role: 'organiser', url: 'https://eni.top/', logo: '/partners/mono/eni.svg', theme: 'light' };

// Roles are ids for events.role.<id> in the locale files, and are event-specific. An organiser, a featured initiative, and a project
// represented by our founder are not interchangeable partnership claims.
export const EVENT_CREDITS: Record<string, EventCredit[]> = {
  'aisem-selangor': [credit('MyDAC Malaysia', 'featured'), credit('LEJIEND', 'featured')],
  changsha: [eni],
  hangzhou: [eni, credit('DAOaaS', 'platform')],
  bali: [credit('Pionex', 'coOrganiser'), credit('9Bit', 'coOrganiser'), credit('HODL', 'coOrganiser'), credit('Kripto101', 'coOrganiser')],
  'chain-of-trust': [credit('CCACC', 'host'), credit('Fableration', 'host')],
  gala: [credit('MySekolahKripto', 'coHost')],
  'paygo-meetup': [credit('PayGo', 'coHost'), credit('Finweek KL', 'jv')],
  'nova-mexc': [credit('MySekolahKripto', 'organiser'), credit('MEXC', 'partner')],
  'blockchain-evolution': [credit('MySekolahKripto', 'host'), credit('EUFT', 'partner'), credit('GameSpace', 'represented')],
};
