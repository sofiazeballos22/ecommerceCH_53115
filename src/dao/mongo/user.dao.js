import User from '../mongo/models/user.model.js';

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
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }

    async getUserByRefreshToken(token) {
        return await User.findOne({ refreshTokens: token });
    }

    async updateUserRefreshTokens(userId, refreshToken) {
        return await User.findByIdAndUpdate(userId, { refreshTokens }, { new: true });
    }

    async addDocuments(userId, documents) {
        return await User.findByIdAndUpdate(userId, { $push: {documents: {$each: documents } } }, { new: true });
    }

    async upgradeToPremium(userId) {
        return await User.findById(userId);
        if (!user) return null;

        const requiredDocuments = ['profile','document'];
        const hasAllDocuments = requiredDocuments.every(doc =>
            user.documents.some(userDoc => userDoc.name === doc )
        );

        if (!hasAllDocuments) return null; 

        user.role = 'premium'
        return await user.save();
    }

    async getUserByResetToken(token) {
        return User.findOne({ resetPasswordToken: token });
    }

    async upgradeUserToPremium (userId, isAdminUpgrade = false ) {
        const updateData = { role: 'premium' };

        if (isAdminUpgrade) {
            updateData.isAdminUpgrade = true;
        }
        
    return await User.findByIdAndUpdate(userId, updateData, { new: true});
    }   

    async updateUser(userId, updates) {
        return await User.findByIdAndUpdate(userId, updates, { new: true });
    }

    async updateUserFields(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }


    
  async getUserByToken(token) {
    return await User.findOne({ resetPasswordToken: token });
  }
  
}
export default new UserDAO();