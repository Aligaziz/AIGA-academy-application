const express = require('express');
const router = express.Router();
router.use('/bank', bankRoutes);
router.use('/chat', chatRoutes);
const lessonRoutes = require('./lessonRoutes');
const clientRoutes = require('./clientRoutes');
router.use('/lesson', lessonRoutes);
router.use('/client', clientRoutes);
module.exports = versionString => ({
  private: require(`./${versionString}/privateRoutes`),
  public: require(`./${versionString}/publicRoutes`),
  router
});
