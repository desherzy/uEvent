const ApiError = require("../exceptions/apiError");
const path = require("path");
const fs = require("fs");


class CompanyController {
    async getCompanies(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async getCompany(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async createCompany(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async deleteCompany(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async updateCompany(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async uploadCompanyImage(req, res, next) {
        try {
            const userId = req.user.id;
            const { photo } = req.files;

            if (!photo) {
                return res.status(400).json({ message: 'Photo is required' });
            }
            const uploadDir = path.join(__dirname, '../public/companiesImages');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            const randomChars = Array.from({ length: 7 }, () =>
                String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            ).join('');

            const fileName = `${userId}_${randomChars}.png`;
            const filePath = path.join(uploadDir, fileName);
            await photo.mv(filePath);
            const imageUrl = `${process.env.API_URL}/public/companiesImages/${fileName}`;
            console.log(imageUrl)                       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         /*   const updatedUser = await userService.uploadUserPhoto(userId, imageUrl);
            res.json(updatedUser); */
        } catch (e) {
            next(e);
        }
    }

    async deleteCompanyImage(req, res, next) {
        try {
            const userId = req.user.id;

            // SERVICE

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CompanyController();