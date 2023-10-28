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
 * titlize
 * returns the string with capitalized words
 *
 * @param {String} str
 * @return {String}
 */
function titlize(str) {
  return str.toLowerCase()
    .split(' ')
    .map((word) => (word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()))
    .join(' ');
}


function createPatch(oldObj, newObj) {
  let diff = Object.keys(oldObj).reduce((current, key) => {
    if (!Object.hasOwn(newObj, key)) {
      return current;
    }

    if (oldObj[key] === newObj[key]) {
      return current;
    }

    if (newObj[key] === undefined) {
      return current;
    }

    return {
      ...current,
      [key]: newObj[key],
    };
  }, {});

  diff = Object.keys(newObj).reduce((current, key) => {
    if (!Object.hasOwn(oldObj, key)) {
      return {
        ...current,
        [key]: newObj[key],
      };
    }

    return {
      ...current,
    };
  }, diff);

  return diff;
}


function isDoctorType(bookingType) {
  return bookingType === 'doctor';
}


export {
  getRandomInt,
  humanizeDate,
  titlize,

  createPatch,
  isDoctorType,
};
