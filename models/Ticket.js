const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Event = require('./Event');
const User = require('./User');

const Ticket = sequelize.define('Ticket', {
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'tickets',
    timestamps: true
});

Ticket.belongsTo(Event, { foreignKey: 'event_id', allowNull: false });
Ticket.belongsTo(User, { foreignKey: 'user_id', allowNull: false });

module.exports = Ticket;