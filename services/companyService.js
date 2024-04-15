const Company = require('../models/Company');
const User = require('../models/User');
const UserCompany = require('../models/UserCompany');
const ApiError = require("../exceptions/apiError");

class CompanyService {
    async getCompanies(){
        return await Company.findAll();
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
        await UserCompany.create({user_id: creatorId, company_id: company.id, role_id: 1});
        return company;
    }

    async deleteCompany(companyId) {

    }

    async updateCompany(companyId, updatedFields) {

    }

    async uploadCompanyImage(companyId, imagePath) {

    }

    async deleteCompanyImage(companyId) {

    }
}

module.exports = new CompanyService();