const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  }
};
