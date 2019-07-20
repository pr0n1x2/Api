const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    routeId: { type: 'string' },
    coordinates: {
      type: 'array',
      items: {
        type: 'number',
      },
      minItems: 2,
      maxItems: 2,
    },
  },
  additionalProperties: false,
};

module.exports = schema;
