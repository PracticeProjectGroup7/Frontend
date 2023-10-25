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

/**
 *
 * @param {String} str
 * @return {String}
 */
function titlize(str) {
  return str.toLowerCase().split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ');
}

export {
  getRandomInt,
  humanizeDate,
  titlize,
};
