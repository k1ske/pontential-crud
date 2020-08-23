'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS unaccent;');
    },
    
    down: (queryInterface) => {
        return queryInterface.sequelize.query('DROP EXTENSION IF EXISTS unaccent;');
    }
};
