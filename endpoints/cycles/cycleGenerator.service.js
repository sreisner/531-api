function* dailyLiftsGenerator(dailyLifts) {
  let index = 0;
  while (true) {
    yield dailyLifts[index++ % dailyLifts.length];
  }
}

const roundUpToNearest = (num, nearest) =>
  num + nearest - (num + nearest) % nearest;
const calculateSetWeight = (tm, percOfTm) => roundUpToNearest(tm * percOfTm, 5);

const generateWeeklySessions = (
  trainingMaxes,
  weeklyRepSchemes,
  liftOrder,
  daysPerWeek
) => {
  const liftGen = dailyLiftsGenerator(liftOrder);

  return weeklyRepSchemes.map(week => ({
    sessions: [...Array(daysPerWeek)].map(_ => {
      const lift = liftGen.next().value;

      return {
        sets: week.map(day => ({
          lift,
          reps: day.reps,
          sets: day.sets,
          weight: calculateSetWeight(trainingMaxes[lift], day.percentage),
        })),
      };
    }),
  }));
};

const generateCycle = (config, trainingMaxes, options) => ({
  jumpsThrows: config.jumpsThrows,
  weeklySessions: generateWeeklySessions(
    trainingMaxes,
    config.weeklyRepSchemes,
    config.lifts,
    config.daysPerWeek
  ),
  assistance: config.assistance,
});

module.exports = generateCycle;
