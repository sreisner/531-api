const SessionSchema = Schema({
  week: Number,
  day: Number,
  jumpsThrows: { type: Number, min: 0 },
  sets: [SetSchema],
  assistance: AssistanceSchema,
  inProgress: { type: Boolean, default: false },
  isComplete: { type: Boolean, default: false },
});

module.exports = {
  Session: mongoose.model('Session', SessionSchema),
};
