const formattedName = (name) => {
  if(name) {
     return name.toLowerCase().trim();
  }
}

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
    const name = formattedName(options.entity.name);
    return {
      name,
      description: options.description
    };
  },

  /**
   * Actions to be done post installation of addon
   * 1. Update the addon in the documents package.json under dependencies to run the addon docs. (Using yarn workspaces)
   * 2.
   *
   */
  afterInstall(options) {
    const lowercasedName = formattedName(options.entity.name);
    const DocumentationPackageLocation = ['documentation', 'package.json'].join('/');
    const DocumentationRouterLocation = ['documentation', 'tests', 'dummy', 'app', 'router.js'].join('/');
    const DocumentationTemplatesLocation = ['documentation', 'tests', 'dummy', 'app', 'templates', 'docs.hbs'].join('/');
    return this.insertIntoFile(
      DocumentationPackageLocation,
      (`"@addon/${lowercasedName}": "^0.1.0",`),
      { before: '    "ember-cli-babel"' }
    ).then(() => {
      return this.insertIntoFile(
        DocumentationTemplatesLocation,
        (`{{nav.item ${lowercasedName } "docs.components.addon-${lowercasedName}"}}`),
        { before: '{{/viewer.nav}}' }
      )
    }).then(() => {
      return this.insertIntoFile(
        DocumentationRouterLocation,
        (`this.route("${lowercasedName}");`),
        { after:`  docsRoute(this, function() {\n`}
      )
    })
  }
}
