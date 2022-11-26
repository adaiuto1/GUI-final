const pool = require('./db')
// Do I need to export the functions from the profile model?

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  app.get('/current', async (req, res, next) => { //what is next? 
    try {
        const result = await req.models.user.findUserByEmail(req.body.email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current user:' , err);
        res.status(500).json({ message: err.toString() });
    }
  });

  // post for creating a new user? not entirely sure how to call it tho
  // still kinda confused what the /____ is 
app.post('/createprofile', (req, res) => { 
  console.log(req.body.product);
  const {id} = req.params;
  const body = req.body;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // how do I use the insert into the password with a hash?
        connection.query('INSERT INTO `db`.`profiles` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          // ^ and how does this work anyways
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into profiles table: \n", err);
            res.status(400).send('Problem inserting into profiles stable'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  try {
      const {id} = req.params;
      const body = req.body;
      console.log(body);
      console.log(req.models); //what does this do
      const result = req.models.profiles.createNewProfile(body);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to create new user:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});

app.put('/editprofile', async (request, response) => { //this needs more work
  try {
      console.log('Initiating PUT /editprofiles request');
      console.log('Request has a body / payload containing:', request.body);
      console.log('Request has params containing:', request.query);
    
      const payload = request.body; // This payload should be an object containing update profile data
      const id = request.query.id; // And pull the ID from the request params
      const { DBQuery, disconnect } = await connectToDatabase();
      const results = await DBQuery('UPDATE Profiles SET firstname = ? WHERE id = ?', [payload.firstname, id]);
      console.log('Results of my UPDATE statement:', results);
    
      // Since we already know the id we're looking for, let's load the most up to date data
      const newlyCreatedRecord = await DBQuery('SELECT * FROM Profiles WHERE id = ?', [id]);
      disconnect();
      response.status(200).json(newlyCreatedRecord);
  } catch (err) {
      console.error('There was an error in PUT /editprofiles', err);
      response.status(500).json({ message: err.message });
  }
});

});

app.delete('/deleteprofile', async (req, res) => {
  try {
    console.log('Initiating DELETE /profiles/:id request');
    console.log('Request params is an object containing:', request.query);
    // Extract the id from the request parameters
    const id = request.query.id;
  
    const { DBQuery, disconnect } = await connectToDatabase();
    // Add a WHERE clause to fetch that particular student
    const results = await DBQuery('DELETE FROM Profiles WHERE id = ?', [id]);
    disconnect();
    response.status(200).json(results);
} catch (err) {
    console.error('There was an error in DELETE /students/:id', err);
    response.status(500).json({ message: err.message });
}
})

app.get('/getprofile', async (request, response) => {
  try {
      console.log('Initiating GET /profiles/:id request');
      console.log('Request params is an object containing:', request.query);
      // Extract the id from the request parameters
      const id = request.query.id;
    
      const { DBQuery, disconnect } = await connectToDatabase();
      // Add a WHERE clause to fetch that particular student
      const results = await DBQuery('SELECT * FROM Profiles WHERE id = ?', [id]);
      disconnect();
      response.status(200).json(results);
  } catch (err) {
      console.error('There was an error in GET /students/:id', err);
      response.status(500).json({ message: err.message });
  }
});


app.get('/getallprofiles', (req, res) => {
  try {
    const count = DBQuery('SELECT * FROM profiles');
    if (count) {
      res.status(200).json({updated: count})
    } else {
      res.status(404).json({message: "Record not found"})
    }
  } catch (err) {
    res.status(500).json({message: "Error retrieving all profiles", error: err})
  }
})


  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(err);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });


  // When a user signs up for the first time this is called, then after calls createprofile
  // insert a newly created user into the database 
   // POST /createuser
   app.post('/createuser', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // how do I use the insert into the password with a hash?
        connection.query('INSERT INTO `db`.`profiles` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          // ^ and how does this work anyways
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into profiles table: \n", err);
            res.status(400).send('Problem inserting into profiles stable'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

   // insert a newly created user into the database 
   // POST /createprofile
   app.post('/createprofile', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // how is something like the profile going to be created? Will all the entries be at once or seperate?
        connection.query('INSERT INTO `db`.`profiles` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          // ^ and how does this work anyways
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into profiles table: \n", err);
            res.status(400).send('Problem inserting into profiles stable'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) { //create a function for post
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // POST user
  app.post('/users', (req, res) => {
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('SELECT * FROM Users WHERE username = ?', req.body.username, function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            res.status(400).send('Username already exists, please enter a new username'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('INSERT INTO Users(username, password, account_type) VALUES(?,?,?)', [req.body.username, req.body.password, req.body.account_type], function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating user: \n", err);
                res.status(400).send('Problem creating user'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created new user'); 
              }
            });
          }
        });
      }
    });
  });

  // GET user
  app.get('/users', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM Users', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching users: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining users"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET Users by id
  app.get('/users/:id', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    } 
    else{
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM Users WHERE user_id = ?', req.params.id, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching users: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining users"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    }
  });

  // GET Users by username
  app.get('/users/username/:username/', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("username" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `username`",
      });
    } 
    else{
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM Users WHERE username = ?', req.params.username, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching users: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining users"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    }
  });
}

