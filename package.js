Package.describe({
  name: 'alvaromrinf:live-form-validator',
  summary: 'Validate Semantic UI fields on live',
  version: '1.0.1',
  git: 'https://github.com/avrora/live-form-validator'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('nooitaf:semantic-ui@1.0.0', 'client');

  api.addFiles(['main.js'], 'client');
  api.export('LiveFormValidator', 'client');
});
