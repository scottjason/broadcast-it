var env = (process.env.NODE_ENV !== 'production') ? require('../../env.js') : {};

module.exports = {
  db: {
    uri: process.env.MONGOLAB_URI || env.mongo.uri
  },
  bitly: {
  	username: process.env.BITLY_USERNAME || env.bitly.username,
  	username: process.env.BITLY_KEY || env.bitly.key
  }
};
