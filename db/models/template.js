const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ValueSchema = Schema({
  displayText: String,
  value: Schema.Types.Mixed,
});

const OptionSchema = Schema({
  key: String,
  displayText: String,
  type: String,
  defaultValue: Schema.Types.Mixed,
  values: [ValueSchema],
  helpText: String,
});

const VariantSchema = Schema({
  name: String,
  options: [OptionSchema],
});

const TemplateSchema = Schema({
  name: { type: String, unique: true },
  description: [String],
  options: [OptionSchema],
  variants: [VariantSchema],
});

module.exports = {
  Template: mongoose.model('Template', TemplateSchema),
};
