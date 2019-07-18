const addDays = function(inputDate, days) {
  var date = new Date(inputDate.valueOf());
  date.setDate(date.getDate() + parseInt(days));
  return date;
};

const formattedDate = inputDate => {
  const date = new Date(inputDate);
  return [date.getMonth() + 1, date.getDate(), date.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
};

const arrSum = arr => {
  return arr.reduce(function(a, b) {
    return parseInt(a) + parseInt(b);
  }, 0);
};

export { arrSum, addDays, formattedDate };
