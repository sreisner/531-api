const {
  repeatedArray,
  getLiftOrder,
  getMainLiftPercentages,
  calculateSetWeight,
} = require('../utils');

const { jumpsThrows, assistance } = require('../config');

const getSupplementalTmPercentages = (programming, advanced) => {
  return programming === '531'
    ? advanced
      ? [0.4, 0.5, 0.6]
      : [0.5, 0.6, 0.7]
    : advanced
      ? [0.5, 0.4, 0.6]
      : [0.6, 0.5, 0.7];
};

const foreverBBBGenerator = (trainingMaxes, options) => {
  const { numDaysPerWeek, advanced, programming, startingLift } = options;

  const nextLiftGenerator = repeatedArray(getLiftOrder(startingLift));

  const mainLiftPercentages = getMainLiftPercentages(programming);

  const supplementalTmPercentages = getSupplementalTmPercentages(
    programming,
    advanced
  );

  // all sessions - 3 weeks
  return [...Array(3)].map((_, i) => [
    // week i
    ...[...Array(numDaysPerWeek)].map(_ => {
      const mainLift = nextLiftGenerator.next().value;

      return {
        jumpsThrows,
        sets: [
          // 3 main sets
          ...[...Array(3)].map((_, j) => ({
            lift: mainLift,
            numSets: 1,
            numReps: 5,
            weight: calculateSetWeight(
              trainingMaxes[mainLift],
              mainLiftPercentages[i][j]
            ),
          })),
          // supplemental sets
          {
            lift: mainLift,
            numSets: 5,
            numReps: 10,
            weight: calculateSetWeight(
              trainingMaxes[mainLift],
              supplementalTmPercentages[i]
            ),
          },
        ],
        assistance,
      };
    }),
  ]);
};

module.exports = foreverBBBGenerator;
