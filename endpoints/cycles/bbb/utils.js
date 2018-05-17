const roundUpToNearest = (num, nearest) => Math.ceil(num / nearest) * nearest;

const calculateSetWeight = (tm, percOfTm) => roundUpToNearest(tm * percOfTm, 5);

function* repeatedArray(arr) {
  let index = 0;
  while (true) {
    yield arr[index++ % arr.length];
  }
}

const getMainLiftPercentages = programming => {
  switch (programming) {
    case '351':
      return [[0.7, 0.8, 0.9], [0.65, 0.75, 0.85], [0.75, 0.85, 0.95]];
    case '531':
    default:
      return [[0.65, 0.75, 0.85], [0.7, 0.8, 0.9], [0.75, 0.85, 0.95]];
  }
};

const lifts = ['squat', 'bench', 'deadlift', 'press'];

const getLiftOrder = startingLift => {
  const startingLiftIndex = lifts.indexOf(startingLift);

  return [
    ...lifts.slice(startingLiftIndex),
    ...lifts.slice(0, startingLiftIndex),
  ];
};

module.exports = {
  calculateSetWeight,
  repeatedArray,
  getMainLiftPercentages,
  getLiftOrder,
};
