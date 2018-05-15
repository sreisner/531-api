const getMainLiftPercentages = programming => {
  switch (programming) {
    case '351':
      return [[0.7, 0.8, 0.9], [0.65, 0.75, 0.85], [0.75, 0.85, 0.95]];
    case '531':
    default:
      return [[0.65, 0.75, 0.85], [0.7, 0.8, 0.9], [0.75, 0.85, 0.95]];
  }
};

const foreverBBBConfig = ({ advanced, daysPerWeek, programming }) => {
  const lifts = ['squat', 'bench', 'deadlift', 'press'];

  const supplementalTmPercentages =
    programming === '531'
      ? advanced
        ? [0.4, 0.5, 0.6]
        : [0.5, 0.6, 0.7]
      : advanced
        ? [0.5, 0.4, 0.6]
        : [0.6, 0.5, 0.7];

  const mainLiftPercentages = getMainLiftPercentages(programming);

  return {
    lifts,
    daysPerWeek,
    jumpsThrows: 10,
    weeklyRepSchemes: mainLiftPercentages.map((week, i) => [
      ...week.map(percentage => ({
        percentage,
        reps: 5,
        sets: 1,
      })),
      {
        percentage: supplementalTmPercentages[i],
        reps: 10,
        sets: 5,
      },
    ]),
    assistance: {
      push: {
        minReps: 25,
        maxReps: 50,
      },
      pull: {
        minReps: 25,
        maxReps: 50,
      },
      abs: {
        minReps: 0,
        maxReps: 50,
      },
    },
  };
};

const alternateLiftMap = {
  squat: 'deadlift',
  deadlift: 'squat',
  bench: 'press',
  press: 'bench',
};

const originalBBBConfig = ({
  daysPerWeek,
  programming,
  squatSupplementalTmPercentage,
  deadliftSupplementalTmPercentage,
  pressSupplementalTmPercentage,
  benchSupplementalTmPercentage,
  alternate,
}) => {
  const lifts = ['squat', 'bench', 'deadlift', 'press'];

  const mainLiftPercentages = getMainLiftPercentages(programming);

  return {
    lifts,
    daysPerWeek,
    jumpsThrows: 10,
    weeklyRepSchemes: mainLiftPercentages.map((week, i) => [
      ...week.map(percentage => ({
        percentage,
        reps: 5,
        sets: 1,
      })),
      {
        // TODO:  Don't just use the squat supplemental %
        percentage: squatSupplementalTmPercentage,
        reps: 10,
        sets: 5,
      },
    ]),
    assistance: {
      push: {
        minReps: 25,
        maxReps: 50,
      },
      pull: {
        minReps: 25,
        maxReps: 50,
      },
      abs: {
        minReps: 0,
        maxReps: 50,
      },
    },
  };
};

const templateVariantConfigMap = {
  'Boring But Big': {
    Forever: foreverBBBConfig,
    Original: originalBBBConfig,
  },
};

module.exports = templateVariantConfigMap;
