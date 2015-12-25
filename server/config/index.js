var env = (process.env.NODE_ENV !== 'production') ? require('../../env.js') : {};

module.exports = {
  db: {
    uri: process.env.MONGO_URI || env.mongo.uri
  }
};
