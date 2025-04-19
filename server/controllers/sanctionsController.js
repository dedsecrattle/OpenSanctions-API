import { searchSanctionsService } from '../services/sanctionsService.js';

export const searchSanctions = async (req, res, next) => {
  try {
    const { query, type, limit = 10, offset = 0 } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: 'query is required' });
    }
    const data = await searchSanctionsService(
      query,
      type,
      Number(limit),
      Number(offset)
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
