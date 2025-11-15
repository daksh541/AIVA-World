import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    price: {
      type: String,
      default: 'Free',
    },
    category: {
      type: String,
      enum: ['Anime', 'Realistic', 'Sci-Fi', 'Fantasy'],
      default: 'Anime',
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;
