const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = Schema(
  {
    userId: Schema.Types.ObjectId,
    satisfaction: Number,
    feedbackType: String,
    comments: String,
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'feedback' }
);

module.exports = {
  Feedback: mongoose.model('Feedback', FeedbackSchema),
};
