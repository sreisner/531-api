const base64 = require('base-64');
const { Template } = require('../../../db/models');

/*
The liftIndex is used for days programmed with different lifts.
For example in Forever BBB, users have the option to do squats
for the 5/3/1 sets (so that will end up being liftIndex 0) and
deadlifts for the 5x10 sets (which will end up being liftIndex 1)
*/
const standard531WeeklyRepSchemes = [
  [
    {
      percentage: 0.65,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.85,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
  ],
  [
    {
      percentage: 0.7,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.8,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.9,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
  ],
  [
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.85,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.95,
      reps: 1,
      sets: 1,
      liftIndex: 0,
    },
  ],
];

const standard351WeeklyRepSchemes = [
  [
    {
      percentage: 0.7,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.8,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.9,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
  ],
  [
    {
      percentage: 0.65,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.85,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
  ],
  [
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.85,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.95,
      reps: 1,
      sets: 1,
      liftIndex: 0,
    },
  ],
];

const foreverBBBConfig = options => {
  const { repScheme: repSchemeName, advanced, daysPerWeek } = options;
  const dailyLifts = options.dailyLifts.split(',');

  const repScheme =
    repSchemeName === '531'
      ? standard531WeeklyRepSchemes
      : standard351WeeklyRepSchemes;

  const supplementalTmPercentages =
    repSchemeName === '531'
      ? advanced
        ? [0.4, 0.5, 0.6]
        : [0.5, 0.6, 0.7]
      : advanced
        ? [0.5, 0.4, 0.6]
        : [0.6, 0.5, 0.7];

  return {
    dailyLifts,
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

const templateConfigMap = {
  'Forever BBB': foreverBBBConfig,
};

const createEndpoints = router => {
  router.route('/templates/:templateId/config').get((req, res) => {
    Template.findById(req.params.templateId, ['name'], (err, template) => {
      const config = templateConfigMap[template.name];
      const options = JSON.parse(base64.decode(req.query.options));
      res.json(config(options));
    });
  });
};

module.exports = {
  createEndpoints,
};
