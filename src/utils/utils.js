function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

/**
 *
 * @param {String} timestamp in milliseconds
 * @return {String}
 */
function humanizeDate(timestamp) {
  return (new Date(parseInt(timestamp, 10))).toDateString();
}

export {
  getRandomInt,
  humanizeDate,
};
