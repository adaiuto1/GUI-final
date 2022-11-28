const knex = require('../database/knex');
const PROFILE = 'profiles';

const createNewProfile = async (body) => { // I need to be able to access the session userID and include it
    const query = knex(PROFILE).insert({ firstName: body.firstName, lastName: body.lastName,
        firstName: body.firstName, smoker: body.smoker, petFriendly: body.petFriendly,
        bio: body.bio, tag1: body.tag1, tag2: body.tag2, tag3: body.tag3, tag4: body.tag4,
        tag5: body.tag5, tag6: body.tag6});  // I truly have no clue if im writing this correctly 
    console.log('Raw query for createNewUser:', query.toString());
    const results = await query;
    return results;
}

const updateProfile = async ({id}, changes) => { 
    const query = knex(PROFILE).where({id}).update(changes); // ¯\_(ツ)_/¯  online help
    console.log('Updated ID: ',{id}.toString(),' With: ', query.toString());
    const results = await query;
    return results;
}

const getProfile = async (id) => {
    const query = knex(PROFILE).where({id});
    const results = await query;
    return results;
}


const fetchAllProfiles = async () => { // would this just be a normal get?
    const query = knex(PROFILE);
    const results = await query;
    return results;
}

const fetchProfilesByName = async (name) => {
    const query = knex(PROFILE).where({ name });
    const results = await query;
    return results;
}

const deleteProfile = async (id) => {
    const query = knex(PROFILE).delete().where({id});
    const results = await query;
    return results;
}

module.exports = {
    createNewProfile,
    updateProfile,
    getProfile,

    fetchAllProfiles,
    fetchProfilesByName,
    deleteProfile
 }