const { sequelize } = require('./dbConfig');
const User = require('./models/User');
const Tokens = require('./models/Tokens');
const Links = require('./models/Links');

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await User.sync({ alter: true });
        await Tokens.sync({ alter: true });
        await Links.sync({ alter: true });

        console.log('\nAll models synchronized successfully.');
    } catch (error) {
        console.error('\nUnable to connect to the database or synchronize models:', error);
    }
}

module.exports = initializeDatabase;