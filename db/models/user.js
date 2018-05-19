const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingMaxesSchema = Schema(
  {
    squat: { type: Number, default: 315 },
    deadlift: { type: Number, default: 405 },
    bench: { type: Number, default: 225 },
    press: { type: Number, default: 135 },
  },
  { _id: false }
);

const SetSchema = Schema(
  {
    lift: String,
    numSets: { type: Number, min: 1 },
    numReps: { type: Number, min: 1 },
    weight: { type: Number, min: 0 },
  },
  { _id: false }
);

const AssistanceTypeSchema = Schema(
  {
    minReps: { type: Number, min: 0 },
    maxReps: { type: Number, min: 0 },
  },
  { _id: false }
);

const AssistanceSchema = Schema(
  {
    push: AssistanceTypeSchema,
    pull: AssistanceTypeSchema,
    abs: AssistanceTypeSchema,
  },
  { _id: false }
);

const SessionSchema = Schema({
  jumpsThrows: { type: Number, min: 0 },
  sets: [SetSchema],
  assistance: AssistanceSchema,
});

const CycleSchema = [[SessionSchema]];

const UserSchema = Schema({
  email: String,
  password: String,
  trainingMaxes: { type: TrainingMaxesSchema, default: TrainingMaxesSchema },
  currentCycle: CycleSchema,
  pastCycles: { type: [CycleSchema], default: [] },
});

module.exports = {
  User: mongoose.model('User', UserSchema),
};
