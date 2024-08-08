const User = require('../mongo/models/user.model');

class UserDAO {
    async createUser(UserData) {
        return await User.create(userData);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async updateUser(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateDaata, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserDAO();