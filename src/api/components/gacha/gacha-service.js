const gachaRepository = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');
const PRIZES = [
  { id: 1, name: 'Emas 10 gram', max_quota: 1, probability: 0.01 },
  { id: 2, name: 'Smartphone X', max_quota: 5, probability: 0.05 },
  { id: 3, name: 'Smartwatch Y', max_quota: 10, probability: 0.1 },
  { id: 4, name: 'Voucher Rp100.000', max_quota: 100, probability: 0.2 },
  { id: 5, name: 'Pulsa Rp50.000', max_quota: 500, probability: 0.3 },
];

async function rollGacha(userId) {
  const todayCount = await gachaRepository.getTodayGachaCount(userId);
  if (todayCount >= 5) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'Kuota gacha harian habis. Maksimal 5 kali per hari.'
    );
  }

  let wonPrize = null;
  const randomRoll = Math.random();
  let cumulativeProb = 0;

  for (const prize of PRIZES) {
    cumulativeProb += prize.probability;
    if (randomRoll <= cumulativeProb) {
      const currentWinners = await gachaRepository.getPrizeWinnerCount(prize.name);
      if (currentWinners < prize.max_quota) {
        wonPrize = prize.name;
      }
      break; 
    }
  }

  await gachaRepository.recordGacha(userId, wonPrize);

  return {
    prize: wonPrize,
    message: wonPrize ? `Selamat! Anda mendapatkan ${wonPrize}` : 'Coba lagi, Anda belum beruntung!',
  };
}

async function getHistory(userId) {
  const history = await gachaRepository.getHistoryByUserId(userId);
  return history.map((h) => ({
    prize: h.prize || 'Zonk',
    date: h.createdAt,
  }));
}

async function getRemainingQuotas() {
  const quotas = [];
  for (const prize of PRIZES) {
    const currentWinners = await gachaRepository.getPrizeWinnerCount(prize.name);
    quotas.push({
      prize: prize.name,
      max_quota: prize.max_quota,
      remaining_quota: prize.max_quota - currentWinners,
    });
  }
  return quotas;
}

function randomMaskName(name) {
  if (!name) return 'Unknown';
  const chars = name.split('');
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] !== ' ' && Math.random() > 0.5) {
      chars[i] = '*';
    }
  }
  return chars.join('');
}

async function getWinnersList() {
  const winners = await gachaRepository.getWinners();
  return winners.map((w) => ({
    prize: w.prize,
    winnerName: randomMaskName(w.userId?.fullName),
    date: w.createdAt,
  }));
}

module.exports = {
  rollGacha,
  getHistory,
  getRemainingQuotas,
  getWinnersList,
};