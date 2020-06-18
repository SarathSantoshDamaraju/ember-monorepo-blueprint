module.exports = {
  description: 'To create mono repo ember addons',
  availableOptions: [
    {
      name: 'description',
      type: String,
      default: 'ember addon'
    }
  ],
  locals(options) {
    const lowercasedName = options.entity.name.toLowerCase();
    return {
      name: lowercasedName,
      description: options.description
    };
  },
};