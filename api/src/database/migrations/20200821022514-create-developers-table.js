'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('developers', {
            id        : {
                type        : Sequelize.UUID,
                primaryKey  : true,
                defaultValue: Sequelize.UUIDV4
            },
            nome      : {
                type     : Sequelize.STRING,
                allowNull: false
            },
            idade         : {
                type     : Sequelize.INTEGER,
                allowNull: false
            },
            hobby         : {
                type     : Sequelize.STRING,
                allowNull: false
            },
            datanascimento: {
                type     : Sequelize.DATEONLY,
                allowNull: false
            }
        });
    },
    
    down: (queryInterface) => {
        return queryInterface.dropTable('developers');
    }
};
