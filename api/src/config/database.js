// necessário apenas pra uso dos commandos do sequelize-cli

if (!process.env.hasOwnProperty('DB_DATABASE')) {
    require('../../node_modules/dotenv/config');
}

module.exports = {
    username     : process.env.DB_USER,
    password     : process.env.DB_PASS,
    database     : process.env.DB_DATABASE,
    host         : process.env.DB_HOST,
    dialect      : process.env.DB_DIALECT,
    seederStorage: 'sequelize'
};
