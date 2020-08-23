'use strict';
const uuid = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('developers', [
            {
                id            : uuid.v4(),
                nome          : 'maike',
                idade         : 27,
                hobby         : 'codar',
                datanascimento: Sequelize.literal("now()::date - INTERVAL '27 years'")
            },
            {
                id            : uuid.v4(),
                nome          : 'kiske',
                idade         : 18,
                hobby         : 'dota',
                datanascimento: Sequelize.literal("now()::date - INTERVAL '18 years'")
            },
            {
                id            : uuid.v4(),
                nome          : 'tiburcio',
                idade         : 29,
                hobby         : 'colunista xgh',
                datanascimento: Sequelize.literal("now()::date - INTERVAL '29 years'")
            },
            {
                id            : uuid.v4(),
                nome          : 'tirso',
                idade         : 35,
                hobby         : 'aprimorar xgh',
                datanascimento: Sequelize.literal("now()::date - INTERVAL '35 years'")
            },
            {
                id            : uuid.v4(),
                nome          : 'newphew',
                idade         : 24,
                hobby         : 'pog',
                datanascimento: Sequelize.literal("now()::date - INTERVAL '24 years'")
            }
        ], {});
    },
    
    down: async (queryInterface, Sequelize) => {
    }
};
