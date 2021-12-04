const pipe =
  (...actions) =>
  (val) =>
    actions.reduce((prev, action) => action(prev), val);

const debug = (val) => {
  console.log(val);

  return val;
};

const chunk =
  (length = 2) =>
  (values) =>
    values.map((current, index, array) => [...array].splice(index, length)).filter((item) => item.length === length);

module.exports = {
  pipe,
  chunk,
  debug,
};
