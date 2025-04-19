import * as sanctionsService from '../services/sanctionsService.js';

export const searchSanctions = async (req, res, next) => {
  try {
    const { query, type } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const results = await sanctionsService.searchSanctions(query, type);
    
    return res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
};