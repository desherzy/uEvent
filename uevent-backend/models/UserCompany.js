const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const User = require('./User');
const Company = require('./Company');
const CompanyRoles = require('./CompanyRoles');

const UserCompany = sequelize.define('UserCompany', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Company,
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CompanyRoles,
            key: 'id'
        }
    }
}, {
    tableName: 'user_company',
    timestamps: false
});


module.exports = UserCompany;
