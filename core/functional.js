const pipe =
  (...actions) =>
  (val, comment = 'puzzle answer') => {
    console.log(`\r`);
    console.time(`${comment}`);
    const result = actions.reduce((prev, action) => action(prev), val);
    console.timeEnd(`${comment}`);

    return result;
  };

const debug = (val) => {
  console.dir(val);

  return val;
};

const splittingNewLine = (text) => text?.toString().trim().split(/\n/);

const chunk =
  (length = 2) =>
  (values) =>
    values.map((_, index, array) => [...array].splice(index, length)).filter((item) => item.length === length);

const sum = (a, b) => a + b;

const toNumber = (value) => parseInt(value, 10);

const buildArray = (size, value) => new Array(size).fill(value);

module.exports = {
  pipe,
  chunk,
  debug,
  sum,
  splittingNewLine,
  toNumber,
  buildArray,
};
