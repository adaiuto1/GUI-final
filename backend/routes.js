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
   app.post('/profiles', async (req, res) => {
    console.log('\n' + req.body.firstname);
    pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      // const id = req.params.id; // And pull the ID from the req params
      const payload = req.body; // This payload should be an object containing update profile data
      // if there is no issue obtaining a connection, execute query and release connection
      var query = 'INSERT INTO profiles (firstname, lastname, user_id, bio, smoker, petFriendly, tag1, tag2, tag3, tag4, tag5, tag6 ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
      //none of this is reffered to as the payload now, update it
      connection.query(query,[payload.firstname, payload.lastname, payload.user_id, payload.bio, payload.smoker, payload.petFriendly,
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

app.put('/profiles/:id', async (req, res) => { //this needs more work
  pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      const payload = req.body; // This payload should be an object containing update profile data
      const id = req.params.id; // And pull the ID from the req params
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



app.delete('/profiles/:id', async (req, res) => {
pool.getConnection(function (err, connection){
if(err){
  // if there is an issue obtaining a connection, release the connection instance and log the error
  logger.error('Problem obtaining MySQL connection',err)
  res.status(400).send('Problem obtaining MySQL connection'); 
} else {
  // if there is no issue obtaining a connection, execute query and release connection
  const id = req.params.id;
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

app.get('/profiles/:id', async (req, res) => {
  // try { // this is what i was trying but failing to get working
  //     console.log('Initiating GET /profiles/:id req');
  //     console.log('req params is an object containing:', req.query);
  //     // Extract the id from the req parameters
  //     const id = req.query.id;
    
  //     const { DBQuery, disconnect } = await connectToDatabase();
  //     // Add a WHERE clause to fetch that particular student
  //     const results = await DBQuery('SELECT * FROM profiles WHERE id = ?', [id]);
  //     disconnect();
  //     res.status(200).json(results);
  // } catch (err) {
  //     console.error('There was an error in GET /students/:id', err);
  //     res.status(500).json({ message: err.message });
  // }
  pool.getConnection(function (err, connection){ 
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      const id = req.params.id;
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query('SELECT * FROM profiles WHERE user_id = ?', [id], function (err, rows, fields) {
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



app.get('/profiles', async (req, res) => {
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
        const query = req.query.username ? `SELECT * FROM Users WHERE username = '${req.query.username}'` : 'SELECT * FROM Users';
        connection.query(query, function (err, rows, fields) {
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
        res: "Missing required field: `id`",
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

  // get property by id
  app.get('/property/:id', async (req, res) => {
    pool.getConnection(function (err, connection){ 
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const id = req.params.id;
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

  // create property
  app.post('/property', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection'); 
     } else {
       const payload = req.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection
       var query = `INSERT INTO property_table (address, city, zipcode, monthlyRent, owner, ratingSum, numRatings, capacity, sqft, allowsPets, allowsSmoking, img, tag1, tag2, tag3, tag4, tag5, tag6, tag7)`
       + ` VALUES ('${payload.address}', '${payload.city}', ${payload.zipcode}, ${payload.monthlyRent}, ${payload.owner}, ${payload.ratingSum}, ${payload.numRatings}, ${payload.capacity}, ${payload.sqft}, ${payload.allowsPets}, `
       + `${payload.allowsSmoking}, '${payload.img}', ${payload.tag1}, ${payload.tag2}, ${payload.tag3}, ${payload.tag4}, ${payload.tag5}, ${payload.tag6}, ${payload.tag7})`;
       //none of this is reffered to as the payload now, update it
       connection.query(query, function (err, rows, fields) {
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


   //update property
   app.put('/property/:id', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection'); 
     } else {
       const id = req.params.id // would this just be ID?
       const payload = req.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection
       var query = 'UPDATE property_table SET address = ?, monthlyRent = ?, owner = ?, ratingSum = ?, numRatings = ?, capacity = ?, sqft = ?, allowsPets = ?, allowsSmoking = ?, img = ?, tag1 = ?, tag2 = ?, tag3 = ?, tag4 = ?, tag5 = ?, tag6 = ?, tag7 = ?, WHERE propertyId=? )'
       //none of this is reffered to as the payload now, update it
       connection.query(query,[payload.address, payload.monthlyRent, payload.owner, payload.ratingSum, payload.numRatings, payload.capacity, payload.sqft, payload.allowsPets,
       payload.allowsSmoking, payload.img, payload.tag1, payload.tag2, payload.tag3, payload.tag4, payload.tag5, payload.tag6, payload.tag7, id], function (err, rows, fields) {
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


   app.delete('/property/:id', (req, res) => {
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection');
        } else {
          connection.query('DELETE FROM property_table WHERE propertyId = ?', [req.params.id], function (err, rows, fields) {
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
    }
  });

  // POST user
  app.post('/application', (req, res) => {
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no error with the query, execute the next query and do not release the connection yet
        connection.query('INSERT INTO applications(tenant, landlord, property_id, response, application_id) VALUES(?,?,?,?,?)', [req.body.tenant, req.body.landlord, req.body.property_id, req.body.response, req.body.application_id], function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem creating application: \n", err);
            res.status(400).send('Problem creating application'); 
          } else { 
            // if there is no error with the query, release the connection instance
            connection.release()
            res.status(200).send('created new application'); 
          }
        });
      }
    });
  });

  app.get('/application', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM applications', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching applications: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining applications"
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

  // edit application
  app.put('/application/:id', async (req, res) => {
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        const payload = req.body; // This payload should be an object containing update profile data
        // if there is no issue obtaining a connection, execute query and release connection
        var query = 'UPDATE applications SET tenant = ?, landlord = ?, property_id = ?, response = ?, application_id = ? WHERE application_id = ? '
        //none of this is reffered to as the payload now, update it
        connection.query(query,[payload.response], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error editing application: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error editing application"
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

    //comments functions
    app.post('/comment', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection');
     } else {
       const body = req.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection
       var query = 'INSERT INTO comments(property_id, user_id, comment)'
       //none of this is reffered to as the payload now, update it
       connection.query(query,[body.property_id, body.user_id, body.comment], function (err, rows, fields) {
         connection.release();
         if (err) {
           logger.error("Error while posting the comment: \n", err);
           res.status(400).json({
             "data": [],
             "error": "Error creating comment"
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

   app.get('/comment/:id', async (req, res) => {
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const id = req.params.id;
        connection.query('SELECT * FROM comments WHERE property_id = ?', [id], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching comments: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining comments"
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

   app.delete('/comment/:id/:prop_id', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection');
     } else {
       const body = req.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection

       //none of this is reffered to as the payload now, update it
       connection.query('DELETE FROM comments WHERE property_id = ? AND user_id = ?', [body.property_id, body.user_id], function (err, rows, fields) {
         connection.release();
         if (err) {
           logger.error("Error while deleting the comment: \n", err);
           res.status(400).json({
             "data": [],
             "error": "Error deleting comment"
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


   //landlord rating calls

   app.post('/rating', async (req, res) => {
    pool.getConnection(function (err, connection){
     if(err){
       // if there is an issue obtaining a connection, release the connection instance and log the error
       logger.error('Problem obtaining MySQL connection',err)
       res.status(400).send('Problem obtaining MySQL connection');
     } else {
       const body = req.body; // This payload should be an object containing update profile data
       // if there is no issue obtaining a connection, execute query and release connection
       var query = 'INSERT INTO landlord_rating(landlord_id, rating)'
       //none of this is reffered to as the payload now, update it
       connection.query(query,[body.landlord_id, body.rating], function (err, rows, fields) {
         connection.release();
         if (err) {
           logger.error("Error while posting the rating: \n", err);
           res.status(400).json({
             "data": [],
             "error": "Error submitting rating"
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

    app.get('/rating/:id', async (req, res) => {
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const id = req.params.id;
        connection.query('SELECT * FROM landlord_rating WHERE landlord_id = ?', [id], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching ratings: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining ratings"
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

}
