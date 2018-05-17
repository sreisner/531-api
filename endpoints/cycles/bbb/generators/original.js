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

  // all sessions - 3 weeks
  return [...Array(3)].map((_, i) => [
    // week i
    ...[...Array(numDaysPerWeek)].map(_ => {
      const mainLift = nextLiftGenerator.next().value;

      const supplementalLift = shouldAlternate
        ? alternateLiftMap[mainLift]
        : mainLift;

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
  ]);
};

module.exports = originalBBBGenerator;
