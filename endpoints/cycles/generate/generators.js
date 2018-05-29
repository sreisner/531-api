const generatorMap = {
  'Boring But Big': require('./bbb'),
};

const getTemplateGenerator = (template, variant) => {
  if (!generatorMap[template]) {
    throw Error('Template not found');
  } else if (!generatorMap[template][variant]) {
    throw Error('Variant not found');
  }

  return generatorMap[template][variant];
};

module.exports = getTemplateGenerator;
