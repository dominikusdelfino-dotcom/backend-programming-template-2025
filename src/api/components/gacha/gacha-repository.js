const { Gacha } = require('../../../models');

async function getTodayGachaCount(userId) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });
}
async function getPrizeWinnerCount(prizeName) {
  return Gacha.countDocuments({ prize: prizeName });
}
async function recordGacha(userId, prize) {
  return Gacha.create({ userId, prize });
}
async function getHistoryByUserId(userId) {
  return Gacha.find({ userId }).sort({ createdAt: -1 });
}
async function getWinners() {
  return Gacha.find({ prize: { $ne: null } }).populate('userId', 'fullName');
}

module.exports = {
  getTodayGachaCount,
  getPrizeWinnerCount,
  recordGacha,
  getHistoryByUserId,
  getWinners,
};