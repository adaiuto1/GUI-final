const User = require('../models/users')
const Profile = require('../models/profiles');

const createModelsMiddleware = async (req, res, next) => {
  req.models = {
     user: User,
     profile: Profile
 }
 next();
}

module.exports = {
 createModelsMiddleware
}