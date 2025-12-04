export type ProjectStatus = 'current' | 'in-progress' | 'completed';

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  tags: string[];
  description?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Spiral',
    status: 'current',
    tags: ['Grantee', 'Bitcoin'],
    description: 'Open source development kit for Bitcoin wallet interfaces.',
    link: '#'
  },
  {
    id: '2',
    title: 'BTCPay Server',
    status: 'in-progress',
    tags: ['Product Strategy', 'Bitcoin', 'Payments'],
    description: 'Self-hosted, open-source cryptocurrency payment processor.',
    link: '#'
  },
  {
    id: '3',
    title: 'Stratum V2',
    status: 'in-progress',
    tags: ['Bitcoin', 'Mining', 'Protocol'],
    description: 'Next generation protocol for pooled mining.',
    link: '#'
  },
  {
    id: '4',
    title: 'Bitcoin Design',
    status: 'completed',
    tags: ['Design', 'Open Source'],
    description: 'Community growing the design ecosystem in Bitcoin.',
    link: '#'
  },
  {
    id: '5',
    title: 'Bitcoin Smiles',
    status: 'completed',
    tags: ['Non-profit', 'El Salvador'],
    description: 'Providing dental care to communities in El Salvador.',
    link: '#'
  },
  {
    id: '6',
    title: 'BitcoinShirt.co',
    status: 'completed',
    tags: ['E-commerce', 'Bitcoin'],
    description: 'Merchandise store for the Bitcoin community.',
    link: '#'
  },
  {
    id: '7',
    title: 'Hub21',
    status: 'completed',
    tags: ['Research', 'Community'],
    description: 'Community research hub for decentralized technologies.',
    link: '#'
  }
];
