import * as sanctionsService from '../services/sanctionsService.js';

export const searchSanctions = async (req, res, next) => {
  try {
    const { query, type, limit, offset } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const parsedLimit = parseInt(limit, 10) || 10;
    const parsedOffset = parseInt(offset, 10) || 0;

    const results = await sanctionsService.searchSanctions(query, type, parsedLimit, parsedOffset);

    return res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
};
