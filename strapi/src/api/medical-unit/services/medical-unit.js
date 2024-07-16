'use strict';

/**
 * medical-unit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::medical-unit.medical-unit');
