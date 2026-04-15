const gachaService = require('./gacha-service');

async function playGacha(request, response, next) {
  try {
    const { user_id } = request.body;
    if (!user_id) {
      return response.status(400).json({ error: 'user_id is required' });
    }
    const result = await gachaService.rollGacha(user_id);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { user_id } = request.query;
    if (!user_id) {
      return response.status(400).json({ error: 'user_id query parameter is required' });
    }
    const history = await gachaService.getHistory(user_id);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}
async function getQuotas(request, response, next) {
  try {
    const quotas = await gachaService.getRemainingQuotas();
    return response.status(200).json(quotas);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinnersList();
    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  playGacha,
  getHistory,
  getQuotas,
  getWinners,
};