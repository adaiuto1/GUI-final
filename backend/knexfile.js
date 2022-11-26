module.exports = {
    development: {
      client: 'mysql',
      debug: true, // what does this affect?
      connection: { // I need to call pool here
        host: process.env.MYSQL_CLOUD_HOST,
        user: process.env.MYSQL_CLOUD_USER,
        password: process.env.MYSQL_CLOUD_PASS,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,       
      }
    }
   };