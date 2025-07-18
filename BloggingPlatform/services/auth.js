const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = new User(userData);
    return await user.save();
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
};

const updateUserProfile = async (userId, profileData) => {
    return await User.findByIdAndUpdate(userId, { profile: profileData }, { new: true });
  };
  
module.exports = { registerUser, loginUser, updateUserProfile };