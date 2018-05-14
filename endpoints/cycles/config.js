const foreverBBBConfig = ({ advanced, daysPerWeek, programming }) => {
  const lifts = ['bench', 'deadlift', 'press', 'squat'];

  const supplementalTmPercentages =
    programming === '531'
      ? advanced
        ? [0.4, 0.5, 0.6]
        : [0.5, 0.6, 0.7]
      : advanced
        ? [0.5, 0.4, 0.6]
        : [0.6, 0.5, 0.7];

  const mainLift351Percentages = [
    [0.7, 0.8, 0.9],
    [0.65, 0.75, 0.85],
    [0.75, 0.85, 0.95],
  ];

  const mainLift531Percentages = [
    [0.65, 0.75, 0.85],
    [0.7, 0.8, 0.9],
    [0.75, 0.85, 0.95],
  ];

  const mainLiftPercentages =
    programming === '531' ? mainLift531Percentages : mainLift351Percentages;

  return {
    lifts,
    daysPerWeek,
    jumpsThrows: 10,
    weeklyRepSchemes: mainLiftPercentages.map((week, i) => [
      ...week.map(percentage => ({
        percentage,
        reps: 5,
        sets: 1,
        liftIndex: 0,
      })),
      {
        percentage: supplementalTmPercentages[i],
        reps: 10,
        sets: 5,
        liftIndex: 0,
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
  squatSuppTm,
  deadliftSuppTm,
  pressSuppTm,
  benchSuppTm,
}) => {
  const lifts = ['squat', 'bench', 'deadlift', 'press'];

  return {
    lifts,
    daysPerWeek,
    jumpsThrows: 10,
    weeklyRepSchemes: repScheme.map((week, i) => [
      ...week,
      {
        percentage: supplementalTmPercentages[i],
        reps: 10,
        sets: 5,
        liftIndex: 0,
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
