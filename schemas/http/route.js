const schema = {
  type: 'object',
  properties: {
    color: {
      type: 'string',
      pattern: '^#(\\d){6}$',
    },
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    lines: {
      type: 'array',
      minItems: 0,
      maxItems: 1000,
      items: {
        type: 'object',
        properties: {
          thickness: {
            type: 'number',
            minimum: 0.1,
            maximum: 10,
          },
          coordinates: {
            type: 'array',
            items: {
              type: 'number',
              minimum: -180,
              maximum: 180,
            },
            minItems: 2,
            maxItems: 2,
          },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};

module.exports = schema;
