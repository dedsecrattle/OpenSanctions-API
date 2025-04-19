import express from 'express';
import * as sanctionsController from '../controllers/sanctionsController.js';

const router = express.Router();

router.get('/search', sanctionsController.searchSanctions);

export default router;