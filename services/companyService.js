const Company = require('../models/Company');
const User = require('../models/User');
const UserCompany = require('../models/UserCompany');
const ApiError = require("../exceptions/apiError");
const UserDto = require("../dtos/UserDto");

class CompanyService {
    async getCompanies(){
        return await Company.findAll();
    }

    async getUserCompanies(userId) {
        const userCompanies = await UserCompany.findAll({
            where: { user_id: userId }
        });

        const companyIds = userCompanies.map(userCompany => userCompany.company_id);

        const companies = await Company.findAll({
            where: { id: companyIds }
        });

        return companies;
    }

    async getCompanyById(companyId){
        const company = await Company.findOne({where: {id: companyId}});
        if (!company) {
            throw ApiError.notFound("Company not found");
        }
        return company;
    }

    async createCompany(name, description, location, creatorId){
        const user = await User.findByPk(creatorId);
        if (!user) {
            throw ApiError.badRequest("User does not exist");
        }

        const company = await Company.create({name: name, description: description, location: location});
        console.log('\nID + ' + company.id + '\n');
        await UserCompany.create({user_id: creatorId, company_id: company.id, role_id: 1});
        return company;
    }

    async deleteCompany(companyId) {
        //TODO
    }

    async updateCompany(companyId, updatedFields) {
        const company = await Company.findByPk(companyId);
        if (!company) {
            throw ApiError.notFound("Company not found");
        }

        if (updatedFields.name) {
            company.name = updatedFields.name;
        }
        if (updatedFields.description) {
            company.description = updatedFields.description;
        }
        if (updatedFields.location) {
            company.location = updatedFields.location;
        }

        await company.save();
        return company;

    }

    async uploadCompanyImage(companyId, imagePath) {
        const company = await Company.findByPk(companyId);

        if (!company) {
            throw ApiError.badRequest('Company is not found');
        }
        if (imagePath) {
            company.logo = imagePath;
        }

        await company.save();
        return company;
    }

    async deleteCompanyImage(companyId) {
        const company = await Company.findByPk(companyId);

        if (!company) {
            throw ApiError.notFound("Company not found");
        }

        company.logo = null;
        await company.save();
        return company;
    }
}

module.exports = new CompanyService();