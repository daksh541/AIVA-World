import { Router } from 'express';
import { getAvatars, createAvatar } from '../controllers/avatarController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAvatars);
router.post('/', protect, createAvatar);

export default router;
