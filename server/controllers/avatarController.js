import Avatar from '../models/Avatar.js';

export const getAvatars = async (req, res, next) => {
  try {
    const avatars = await Avatar.find().sort({ createdAt: -1 });
    res.json({ avatars });
  } catch (error) {
    next(error);
  }
};

export const createAvatar = async (req, res, next) => {
  try {
    const { name, creator, price, category, description, imageUrl } = req.body;

    if (!name || !creator) {
      return res.status(400).json({ message: 'Name and creator are required' });
    }

    const avatar = await Avatar.create({
      name,
      creator,
      price: price || 'Free',
      category: category || 'Anime',
      description: description || '',
      imageUrl: imageUrl || '',
      likes: 0,
      downloads: 0,
    });

    res.status(201).json({ avatar });
  } catch (error) {
    next(error);
  }
};
