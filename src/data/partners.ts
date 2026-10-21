/* One-colour SVG traces in public/partners/mono. `ratio` is the trace's width/height; `tune` corrects
   optical weight for unusually light (thin-line) or heavy marks. */
const PARTNER_LIST = [
  { name: 'ENI', file: 'eni', href: 'https://eni.top/', ratio: 3.24 },
  { name: 'Bitget Wallet', file: 'bitget', href: 'https://web3.bitget.com/en', ratio: 6.28 },
  { name: 'CertiK', file: 'certik', href: 'https://www.certik.com/', ratio: 3.43, tune: 1.1 },
  { name: 'DAOaaS', file: 'daoaas', href: 'https://daoaas.io/', ratio: 3.02 },
  { name: 'DeBox', file: 'debox', href: 'https://debox.pro/', ratio: 3.92 },
  { name: 'MetaMask', file: 'metamask', href: 'https://metamask.io/', ratio: 2.91 },
  { name: 'Orbiter Finance', file: 'orbiter', href: 'https://orbiter.finance/trade/Arbitrum', ratio: 5.16 },
  { name: 'Ave.ai', file: 'ave', href: 'https://ave.ai/', ratio: 3.64 },
  { name: 'EMURGO', file: 'emurgo', href: 'https://www.emurgo.io/', ratio: 4.0 },
  { name: 'Filecoin', file: 'filecoin', href: 'https://filecoin.io/', ratio: 3.05 },
  { name: 'GMO', file: 'gmo', href: 'https://group.gmo/en/', ratio: 4.84, tune: 0.9 },
  { name: 'SafePal', file: 'safepal', href: 'https://www.safepal.com/en/', ratio: 4.44 },
];

// Equal visual area: a 4:1 logo is 30px tall; wider logos get shorter, squarer ones taller.
const AREA = 30 * 30 * 4;

export const PARTNERS = PARTNER_LIST.map(({ file, ratio, tune = 1, ...partner }) => {
  const height = Math.round(Math.sqrt(AREA / ratio) * tune);
  return { ...partner, logo: `/partners/mono/${file}.svg`, height, width: Math.round(height * ratio) };
});
