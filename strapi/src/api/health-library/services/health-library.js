'use strict';

/**
 * health-library service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::health-library.health-library');
