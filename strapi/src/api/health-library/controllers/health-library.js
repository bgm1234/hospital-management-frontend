'use strict';

/**
 * health-library controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::health-library.health-library');
