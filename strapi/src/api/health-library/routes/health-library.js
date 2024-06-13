'use strict';

/**
 * health-library router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::health-library.health-library');
