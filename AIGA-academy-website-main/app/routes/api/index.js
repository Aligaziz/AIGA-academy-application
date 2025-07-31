const express = require('express');
const router = express.Router();
router.use('/bank', bankRoutes);
router.use('/chat', chatRoutes);
module.exports = versionString => ({
  private: require(`./${versionString}/privateRoutes`),
  public: require(`./${versionString}/publicRoutes`),
  router
});
