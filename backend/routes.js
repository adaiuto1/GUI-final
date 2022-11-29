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
  

// insert a newly created user into the database 
   // POST /createprofile
   app.post('/profile/:id', async (req, res) => {
   pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      const id = request.query.id; // And pull the ID from the request params
      const payload = request.body; // This payload should be an object containing update profile data
      // if there is no issue obtaining a connection, execute query and release connection
      var query = 'INSERT INTO profiles(firstname, lastname, user_id, bio, smoker, petFriendly, tag1, tag2, tag3, tag4, tag5, tag6 )'
      //none of this is reffered to as the payload now, update it
      connection.query(query,[payload.firstName, payload.lastName, id, payload.bio, payload.smoker, payload.petFriendly,
        payload.tag1, payload.tag2, payload.tag3, payload.tag4, payload.tag5, payload.tag6], function (err, rows, fields) {
        connection.release();
        if (err) {
          logger.error("Error while inserting new profile: \n", err);
          res.status(400).json({
            "data": [],
            "error": "Error creating profile"
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

app.put('/profile/:id', async (request, response) => { //this needs more work
  pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      const payload = request.body; // This payload should be an object containing update profile data
      const id = request.query.id; // And pull the ID from the request params
      // if there is no issue obtaining a connection, execute query and release connection
      var query = 'UPDATE profiles SET firstname = ?, lastname = ?, smoker = ?, petFriendly = ? bio = ?, tag1 = ?, tag2 = ?, tag3 = ?, tag4 = ?, tag5 = ?, tag6, WHERE id=?  '
      //none of this is reffered to as the payload now, update it
      connection.query(query,[payload.firstName, payload.lastName, payload.bio, payload.smoker, payload.petFriendly,
        payload.tag1, payload.tag2, payload.tag3, payload.tag4, payload.tag5, payload.tag6, req.query.id], function (err, rows, fields) {
        connection.release();
        if (err) {
          logger.error("Error editing profile: \n", err);
          res.status(400).json({
            "data": [],
            "error": "Error editing profile"
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



app.delete('/profile/:id', async (req, res) => {
pool.getConnection(function (err, connection){
if(err){
  // if there is an issue obtaining a connection, release the connection instance and log the error
  logger.error('Problem obtaining MySQL connection',err)
  res.status(400).send('Problem obtaining MySQL connection'); 
} else {
  // if there is no issue obtaining a connection, execute query and release connection
  const id = request.query.id;
  connection.query('DELETE FROM profiles WHERE id = ?', [id], function (err, rows, fields) {
    connection.release();
    if (err) {
      logger.error("Error while deleting profile: \n", err);
      res.status(400).json({
        "data": [],
        "error": "Error deleting profile"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
}
});
})

app.get('/profile/:id', async (request, response) => {
  // try { // this is what i was trying but failing to get working
  //     console.log('Initiating GET /profiles/:id request');
  //     console.log('Request params is an object containing:', request.query);
  //     // Extract the id from the request parameters
  //     const id = request.query.id;
    
  //     const { DBQuery, disconnect } = await connectToDatabase();
  //     // Add a WHERE clause to fetch that particular student
  //     const results = await DBQuery('SELECT * FROM profiles WHERE id = ?', [id]);
  //     disconnect();
  //     response.status(200).json(results);
  // } catch (err) {
  //     console.error('There was an error in GET /students/:id', err);
  //     response.status(500).json({ message: err.message });
  // }
  pool.getConnection(function (err, connection){ 
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      const id = request.query.id;
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query('SELECT * FROM profiles WHERE id = ?', [id], function (err, rows, fields) {
        connection.release();
        if (err) {
          logger.error("Error while fetching profile: \n", err);
          res.status(400).json({
            "data": [],
            "error": "Error obtaining profile"
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



app.get('/getallprofiles', async (req, res) => {
  pool.getConnection(function (err, connection){ // I'm throwing the towel. Nothing from class works. Will do the template given
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query('SELECT * FROM profiles', function (err, rows, fields) {
        connection.release();
        if (err) {
          logger.error("Error while fetching profiles: \n", err);
          res.status(400).json({
            "data": [],
            "error": "Error obtaining profiles"
          })
        } else {
          res.status(200).json({
            "data": rows
          });
        }
      });
    }
  });
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


  // Property Functions

  app.get('/getallproperties', async (req, res) => {
    pool.getConnection(function (err, connection){ // I'm throwing the towel. Nothing from class works. Will do the template given
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM property_table', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching property_table: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining property_table"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  })

  app.get('/property/:id', async (request, response) => {
    pool.getConnection(function (err, connection){ 
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const id = request.query.id;
        connection.query('SELECT * FROM property_table WHERE PropertyId = ?', [id], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching property: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining property"
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

  app.post('/property', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection'); 
     } else {
       const payload = request.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection
       var query = 'INSERT INTO property_table(address, propertyId, monthlyRent, owner, ratingSum, numRatings, allowsPets, allowsSmoking, img, tag1, tag2, tag3, tag4, tag5, tag6)'
       //none of this is reffered to as the payload now, update it
       connection.query(query,[payload.address, payload.propertyId, payload.monthlyRent, payload.owner, payload.ratingSum, payload.numRatings, payload.allowsPets,
       payload.allowsSmoking, payload.img, payload.tag1, payload.tag2, payload.tag3, payload.tag4, payload.tag5, payload.tag6], function (err, rows, fields) {
         connection.release();
         if (err) {
           logger.error("Error while creating new property: \n", err);
           res.status(400).json({
             "data": [],
             "error": "Error creating property"
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

   app.put('/property/:id', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection'); 
     } else {
       const id = req.params.propertyId // would this just be ID?
       const payload = request.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection
       var query = 'UPDATE property_table SET address = ?, propertyId = ?, monthlyRent = ?, owner = ?, ratingSum = ?, numRatings = ?, allowsPets = ?, allowsSmoking = ?, img = ?, tag1 = ?, tag2 = ?, tag3 = ?, tag4 = ?, tag5 = ?, tag6 = ?, WHERE propertyId=? )'
       //none of this is reffered to as the payload now, update it
       connection.query(query,[payload.address, payload.propertyId, payload.monthlyRent, payload.owner, payload.ratingSum, payload.numRatings, payload.allowsPets,
       payload.allowsSmoking, payload.img, payload.tag1, payload.tag2, payload.tag3, payload.tag4, payload.tag5, payload.tag6, id], function (err, rows, fields) {
         connection.release();
         if (err) {
           logger.error("Error while updating property: \n", err);
           res.status(400).json({
             "data": [],
             "error": "Error updating property"
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

   app.delete('/property/:id', async (req, res) => {
    pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      const id = request.query.propertyId;
      connection.query('DELETE FROM property_table WHERE propertyId = ?', [id], function (err, rows, fields) {
        connection.release();
        if (err) {
          logger.error("Error while deleting property: \n", err);
          res.status(400).json({
            "data": [],
            "error": "Error deleting property"
          })
        } else {
          res.status(200).json({
            "data": rows
          });
        }
      });
    }
    });
    })

}
