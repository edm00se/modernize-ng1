// per jest docs, must return sync func on process property

module.exports = {
  process: function(src) {

    return {
      // we already have the raw source provided, just return it
      code: src
    };
  }
};