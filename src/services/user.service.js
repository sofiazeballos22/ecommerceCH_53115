const UserDAO = require('../dao/mongo/user.dao');
const UserDTO = require('../dto/user.dto');

class UserService {
    async createUser(userData) {
        const user = await UserDAO.createUser(userData);
        return new UserDTO(user);
    }

    async getUserByEmail(email) {
        const user = await UserDAO.getUserByEmail(email);
        return new UserDTO(user);
    }

    async getUserById(id) {
        const user = await UserDAO.getUserById(id);
        return new UserDTO(user);
    }

    async getUserByRefreshToken(token) {
        const user = await UserDAO.getUserByRefreshToken(token);
        return new UserDTO(user);
    }

    async addDocuments(userId, documents) {
        const user = await UserDAO.addDocuments(userId, documents);
        return new UserDTO(user);
    }

    async upgradeToPremium(userId) {
        const user = await UserDAO.upgradeToPremium(userId);
        return new UserDTO(user);
    }

    async updateUserRefreshTokens(userId, refreshTokens) {
        const user = await UserDAO.updateUserRefreshTokens(userId, refreshTokens);
        return updatedUser ? new UserDTO(updatedUser) : null;
    }

    async upgradeToPremium(userId) {
        const user = await UserDAO.upgradeToPremium(userId); 
        return user;
    }
}

module.exports = new UserService();