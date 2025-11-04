// routes/urlRoutes.js
import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/api/shorten', shortenUrl);
router.get('/:shortCode', redirectUrl);

export default router;