/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
require('module-alias/register');
const { JsonSchemaValidation } = require('@jc21/cypress-jsonschema-validation');
const selectTestsWithGrep = require('cypress-select-tests/grep');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', JsonSchemaValidation(config));
  on('file:preprocessor', selectTestsWithGrep(config));
  // ...
  return config;
}
