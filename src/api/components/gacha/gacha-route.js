const express = require('express');
const gachaController = require('./gacha-controller');
const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);
  //jalanin gacha
  route.post('/', gachaController.playGacha);
  //histori gacha
  route.get('/history', gachaController.getHistory);
  //sisa kuota hadiah
  route.get('/quotas', gachaController.getQuotas);
  //daftar pemenang
  route.get('/winners', gachaController.getWinners);
};