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

const foreverBBBConfig = ({ advanced, daysPerWeek, programming }) => {
  const lifts = ['squat', 'bench', 'deadlift', 'press'];

  const repScheme =
    programming === '531'
      ? standard531WeeklyRepSchemes
      : standard351WeeklyRepSchemes;

  const supplementalTmPercentages =
    programming === '531'
      ? advanced
        ? [0.4, 0.5, 0.6]
        : [0.5, 0.6, 0.7]
      : advanced
        ? [0.5, 0.4, 0.6]
        : [0.6, 0.5, 0.7];

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
  },
};

const createEndpoints = router => {
  router
    .route('/templates/:templateId/variants/:variantId/config')
    .get((req, res) => {
      const { templateId, variantId } = req.params;
      const options = JSON.parse(base64.decode(req.query.options));

      Template.findById(templateId, (err, model) => {
        const template = model.toObject();

        const variants = template.variants;
        const variant = variants.find(v => v.id.toString() === variantId);

        res.json(
          templateVariantConfigMap[template.name][variant.name](options)
        );
      });
    });
};

module.exports = {
  createEndpoints,
};
