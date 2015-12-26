var env = (process.env.NODE_ENV !== 'production') ? require('../../env.js') : {};

module.exports = {
  bitly: process.env.BITLY_KEY || env.bitly.key,
  redisUrl: process.env.REDISCLOUD_URL || env.redisUrl
};
