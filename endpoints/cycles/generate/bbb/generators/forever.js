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
  const {
    numDaysPerWeek,
    advanced,
    programming,
    startingLift,
    light,
  } = options;

  const nextLiftGenerator = repeatedArray(getLiftOrder(startingLift));

  const mainLiftPercentages = getMainLiftPercentages(programming);

  const supplementalTmPercentages = getSupplementalTmPercentages(
    programming,
    advanced
  );

  const numWeeksPerCycle = 3;
  const totalNumSessions = numDaysPerWeek * numWeeksPerCycle;

  return [
    ...[...Array(totalNumSessions)].map((_, nthSession) => {
      const mainLift = nextLiftGenerator.next().value;
      const week = Math.floor(nthSession / numDaysPerWeek) + 1;
      const day = Math.floor(nthSession % numDaysPerWeek) + 1;

      return {
        week,
        day,
        jumpsThrows,
        sets: [
          // 3 main sets
          ...[...Array(3)].map((_, setIndex) => ({
            lift: mainLift,
            numSets: 1,
            numReps: 5,
            weight: calculateSetWeight(
              trainingMaxes[mainLift],
              mainLiftPercentages[week - 1][setIndex]
            ),
          })),
          // supplemental sets
          {
            lift: mainLift,
            numSets: light ? 3 : 5,
            numReps: 10,
            weight: calculateSetWeight(
              trainingMaxes[mainLift],
              supplementalTmPercentages[week - 1]
            ),
          },
        ],
        assistance,
      };
    }),
  ];
};

module.exports = foreverBBBGenerator;
