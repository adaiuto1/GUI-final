const knex = require('../database/knex');
//const bcrypt = require('bcrypt');
const USER_TABLE = 'users_table';

const createNewUser = async (email, password) => {
   console.log('Raw password:', password);
   const salt = await bcrypt.genSalt(10);
   console.log('Password salt', salt);
   const hashedPassword = 10 //await bcrypt.hash(password, salt);
   console.log('Hashed password', hashedPassword);
   const query = knex(users_tables).insert({ email, password: hashedPassword });
   console.log('Raw query for createNewUser:', query.toString());
   const result = await query;
   return result;
}

const findUserByEmail = async (email) => { //Here is an example SQL statement
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}


 const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return null;
    }
    const user = users[0];
    const validPassword =  1 //await bcrypt.compare(password, user.password);
    if (validPassword) {
        delete user.password;
        return user;
    }
    return null;
}

/////////

const fetchAllStudents = async () => {
    const query = knex(STUDENT_TABLE);
    const results = await query;
    return results;
}

const fetchStudentsByName = async (name) => {
    const query = knex(STUDENT_TABLE).where({ name });
    const results = await query;
    return results;
}

const updateStudent = async (name, id)  => {
    const query = knex(STUDENT_TABLE).update({name}).where({id});
    const results = await query;
    return results;
}

const createStudent = async (name) => {
    const query = knex(STUDENT_TABLE).insert({name});
    const results = await query;
    return results;
}

const deleteStudent = async (id) => {
    const query = knex(STUDENT_TABLE).delete().where({id});
    const results = await query;
    return results;
}





module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser
 };