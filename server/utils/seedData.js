import Avatar from '../models/Avatar.js';

const seedItems = [
  {
    name: 'Celestial Muse',
    creator: 'ArtistPro',
    likes: 1234,
    downloads: 567,
    price: 'Free',
    category: 'Anime',
    description: 'Ethereal avatar infused with cosmic energy and graceful motion.',
    imageUrl: '',
  },
  {
    name: 'Cyber Warrior',
    creator: 'TechMaster',
    likes: 2341,
    downloads: 892,
    price: '50 Credits',
    category: 'Realistic',
    description: 'Futuristic combat avatar built for immersive storytelling.',
    imageUrl: '',
  },
  {
    name: 'Dream Weaver',
    creator: 'FantasyKing',
    likes: 987,
    downloads: 432,
    price: 'Free',
    category: 'Anime',
    description: 'Whimsical avatar known for imaginative narratives.',
    imageUrl: '',
  },
  {
    name: 'Neon Phantom',
    creator: 'CyberQueen',
    likes: 3456,
    downloads: 1234,
    price: '100 Credits',
    category: 'Realistic',
    description: 'High-energy avatar wrapped in neon motion trails.',
    imageUrl: '',
  },
];

export const seedAvatars = async () => {
  const count = await Avatar.countDocuments();
  if (count === 0) {
    await Avatar.insertMany(seedItems);
    console.log('Seeded avatars collection');
  }
};
