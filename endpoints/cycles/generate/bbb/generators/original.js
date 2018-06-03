const {
  repeatedArray,
  getLiftOrder,
  getMainLiftPercentages,
  calculateSetWeight,
} = require('../utils');

const { jumpsThrows, assistance } = require('../config');

// prettier-ignore
const alternateLiftMap = {
  'squat': 'deadlift',
  'deadlift': 'squat',
  'bench': 'press',
  'press': 'bench',
};

const originalBBBGenerator = (trainingMaxes, options) => {
  const {
    numDaysPerWeek,
    programming,
    squatSupplementalTmPercentage,
    deadliftSupplementalTmPercentage,
    pressSupplementalTmPercentage,
    benchSupplementalTmPercentage,
    shouldAlternate,
    startingLift,
  } = options;

  const nextLiftGenerator = repeatedArray(getLiftOrder(startingLift));

  const mainLiftPercentages = getMainLiftPercentages(programming);

  const supplementalTmMap = {
    squat: squatSupplementalTmPercentage,
    bench: benchSupplementalTmPercentage,
    deadlift: deadliftSupplementalTmPercentage,
    press: pressSupplementalTmPercentage,
  };

  const numWeeksPerCycle = 3;
  const totalNumSessions = numDaysPerWeek * numWeeksPerCycle;

  return [
    ...[...Array(totalNumSessions)].map((_, nthSession) => {
      const mainLift = nextLiftGenerator.next().value;
      const week = Math.floor(nthSession / numDaysPerWeek) + 1;
      const day = Math.floor(nthSession % numDaysPerWeek) + 1;

      const supplementalLift = shouldAlternate
        ? alternateLiftMap[mainLift]
        : mainLift;

      return {
        week,
        day,
        jumpsThrows,
        sets: [
          // 3 main sets
          ...[...Array(3)].map(() => ({
            lift: mainLift,
            numSets: 1,
            numReps: 5,
            weight: calculateSetWeight(
              trainingMaxes[mainLift],
              mainLiftPercentages[week - 1][day - 1]
            ),
          })),
          // supplemental sets
          {
            lift: supplementalLift,
            numSets: 5,
            numReps: 10,
            weight: calculateSetWeight(
              trainingMaxes[supplementalLift],
              supplementalTmMap[supplementalLift]
            ),
          },
        ],
        assistance,
      };
    }),
  ];
};

module.exports = originalBBBGenerator;
