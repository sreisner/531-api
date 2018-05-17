const base64 = require('base-64');
const { Template } = require('../../db/models');
const getTemplateGenerator = require('./generators');

const createEndpoints = router => {
  router.route('/cycles').get((req, res) => {
    const {
      templateId,
      variantId,
      options: encodedOptions,
      squat,
      deadlift,
      bench,
      press,
    } = req.query;

    const trainingMaxes = {
      squat,
      deadlift,
      bench,
      press,
    };

    const options = JSON.parse(base64.decode(encodedOptions));

    Template.findById(templateId, (err, model) => {
      const template = model.toObject();

      const variants = template.variants;
      const variant = variants.find(v => v.id.toString() === variantId);

      const generatorFunc = getTemplateGenerator(template.name, variant.name);

      res.json(generatorFunc(trainingMaxes, options));
    });
  });
};

module.exports = {
  createEndpoints,
};
