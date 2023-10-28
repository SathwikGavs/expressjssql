/*

//Import
var exp = require('express');
var dot = require('dotenv');
var mon = require('mongoose');
var bparser=require('body-parser');
bparserInit=bparser.urlencoded({extended:false});
//Initialize expressjs
var app = exp();


//Copy paste the connection link from mongosh powershell
mon.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpressToMongo").then
    (()=>{console.log('Connected to the database...')}).catch
        (()=>{console.log("Unable to connect. Check the URL")})


        //Define the structure of the collection
        const userSchema={userId : String, password : String, emailId: String};

        //Link the structure with the name of actual collection
        //model(<Collection name>, <schemaName or structureOfTheCollection>)
        var UserData=mon.model('Users', userSchema);

        //prepare the data to insert in the collection
       
          

        
        function getAllUsers(request, response) {
            // Retrieving all records. If successful, retrieve and display; otherwise, handle errors.
            UserData.find()
              .then((data) => {
                console.log(data);
                response.send(data);
              })
              .catch((error) => {
                console.log(error);
                response.send('Could not retrieve the data.');
              });
          }
       


          function addNewUser(request, response){ //Prepare the data to be inserted into the Collection
            var udata=new UserData({'userId': request.body.uid, 'password': request.body.password, 'emailId': request.body.emailId}); //Insert the data into the collections to check if the data insertion is successfully //Use save() function for inserting the data
            udata.save().then((data)=>{console.log("Insert Successfully");
            response.send("<b>Inserted Data Successfully");
            }).catch((error)=>
            {
                console.log(error);
                response.send("Unable to insert the data.")
            })
            }

            


            const { MongoClient, ObjectID } = require('mongodb');


            // DELETE API
function deleteUser(request, response) {
    var userId = request.body.uid;
 
    // Find the user by userId and remove them
    UserData.findOneAndRemove({ 'userId': userId })
        .then((user) => {
            if (!user) {
                response.status(404).send('User not found');
            } else {
                console.log('User deleted successfully');
                response.status(200).send('User deleted successfully');
            }
        })
        .catch((err) => {
            console.error(err);
            response.status(500).send('Error deleting user');
        });
}
 
app.delete('/delete', bparserInit, deleteUser);

            
            
            function updateUser(request, response) {
                var userId = request.body.uid;
                var newPassword = request.body.password;
                var newEmailId = request.body.emailId;
             
                // Find the user by userId and update their data
                UserData.findOne({ 'userId': userId })
                    .then((user) => {
                        if (!user) {
                            response.status(404).send('User not found');
                        } else {
                            // Update user data
                            user.password = newPassword;
                            user.emailId = newEmailId;
                            // Save the updated user data
                            return user.save();
                        }
                    })
                    .then((updatedUser) => {
                        if (updatedUser) {
                            console.log('User data updated successfully');
                            response.status(200).send('User data updated successfully');
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        response.status(500).send('Error updating user');
                    });
            }
             
            app.put('/update', bparserInit, updateUser);






app.post('/addUser', bparserInit, addNewUser);
app.get('/allUsers', getAllUsers);
        

app.listen(8000, function(error){
    if(error != undefined){
        console.log(error.message)
    }
    else
        console.log('Connect to port 8000. Waiting for request')
        console.log('On the browser, visit http://localhost:8000/')
})

*/

/*


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpressToMongo')
  .then(() => {
    console.log('Connected to the database...');
  })
  .catch((err) => {
    console.log('Unable to connect. Check the URL:', err);
  });

// Define the user schema
const userSchema = {
  userId: String,
  password: String,
  emailId: String,
};

// Create a model for the User collection
const UserData = mongoose.model('Users', userSchema);

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve a simple HTML form to input user data
app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
      }
      h1 {
        color: #333;
      }
      label {
        
        display: block;
        margin: 10px 0;
      }
      input {
        width: 20%;
        padding: 5px;
        margin: 5px 0;
      }
      button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      }
      a {
        text-decoration: none;
        color: #007bff;
      }
    </style>
  </head>
  <body>
    <h1 style="color: #007bff;">Mongo DB Add User</h1>
    <form action="/addUser" method="POST">
      <label for="userId">User ID </label>
      <input type="text" id="userId" name="userId"><br>
      <label for="password">Password </label>
      <input type="password" id="password" name="password"><br>
      <label for="emailId">Email ID </label>
      <input type="email" id="emailId" name="emailId"><br>
      <button type="submit">Add User</button>
    </form>

    <h1 style="color: #007bff;">User List</h1>
    <a href="/allUsers">View All Users</a>
  </body>
</html>
  `);
});

// Add a new user
app.post('/addUser', (req, res) => {
  const newUser = new UserData({
    userId: req.body.userId,
    password: req.body.password,
    emailId: req.body.emailId,
  });

  newUser.save()
    .then(() => {
      console.log('User added successfully');
      res.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      res.send('Unable to add the user.');
    });
});

// Retrieve all users
app.get('/allUsers', (req, res) => {
  UserData.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.send('Could not retrieve the data.');
    });
});

const server = app.listen(port, () => {
  const address = server.address();
  console.log(`Server is running on http://localhost:${address.port}`);
});

*/


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpressToMongo')
  .then(() => {
    console.log('Connected to the database...');
  })
  .catch((err) => {
    console.log('Unable to connect. Check the URL:', err);
  });

// Define the user schema
const userSchema = {
  userId: String,
  password: String,
  emailId: String,
};

// Create a model for the User collection
const UserData = mongoose.model('Users', userSchema);

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve a simple HTML form to input user data
app.get('/', (req, res) => {
  res.send(`
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h1 {
          color: #007bff;
        }
        label {
          display: block;
          margin: 10px 0;
        }
        input {
          width: 20%;
          padding: 5px;
          margin: 5px 0;
        }
        button {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
        }
        a {
          text-decoration: none;
          color: #007bff;
        }
      </style>
    </head>
    <body>
      <h1 style="color: #007bff;">Mongo DB Add User</h1>
      <form action="/addUser" method="POST">
        <label for="userId">User ID </label>
        <input type="text" id="userId" name="userId"><br>
        <label for="password">Password </label>
        <input type="password" id="password" name="password"><br>
        <label for="emailId">Email ID </label>
        <input type="email" id="emailId" name="emailId"><br>
        <button type="submit" style="background-color: #007bff; color: #fff;">Add User</button>
      </form>

      <h1 style="color: #007bff;">User List</h1>
      <a href="/allUsers" style="text-decoration: none; color: #007bff;">View All Users</a>
    </body>
  </html>

  `);
});

// Add a new user
app.post('/addUser', (req, res) => {
  const newUser = new UserData({
    userId: req.body.userId,
    password: req.body.password,
    emailId: req.body.emailId,
  });

  newUser
    .save()
    .then(() => {
      console.log('User added successfully');
      res.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      res.send('Unable to add the user.');
    });
});

// Retrieve all users
app.get('/allUsers', (req, res) => {
  UserData.find()
    .then((data) => {
      res.send(`
        <html>
          <head>
            <style>
              /* Add your CSS styles for the table here */
            </style>
          </head>
          <body>
            <h1>User List</h1>
            <a href="/addUser">Add New User</a>
            <table>
              <tr>
                <th>User ID</th>
                <th>Password</th>
                <th>Email ID</th>
                <th>Actions</th>
              </tr>
              ${data
                .map((user) => `
                  <tr>
                    <td>${user.userId}</td>
                    <td>${user.password}</td>
                    <td>${user.emailId}</td>
                    <td>
                      <form action="/deleteUser" method="POST">
                        <input type="hidden" name="userId" value="${user.userId}">
                        <button type="submit">Delete</button>
                      </form>
                      <a href="/updateUser?userId=${user.userId}">Update</a>
                    </td>
                  </tr>
                `)
                .join('')}
            </table>
          </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error(error);
      res.send('Could not retrieve the data.');
    });
});

// Delete a user
app.post('/deleteUser', (req, res) => {
  const userId = req.body.userId;

  UserData.findOneAndRemove({ userId })
    .then(() => {
      console.log('User deleted successfully');
      res.redirect('/allUsers');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting user');
    });
});

// Update a user (GET request to show the update form)
app.get('/updateUser', (req, res) => {
  const userId = req.query.userId;

  UserData.findOne({ userId })
    .then((user) => {
      if (user) {
        res.send(`
        <html>
        <head>
          <style>
            /* Add your CSS styles for the update form here */
          </style>
        </head>
        <body>
          <h1 style="color: #007bff;">Update User Data</h1>
          <form action="/updateUser" method="POST">
            <input type="hidden" name="userId" value="${user.userId}">
            <label for="password">New Password</label>
            <input type="password" id="password" name="password" value="${user.password}"><br>
            <label for="emailId">New Email ID</label>
            <input type="email" id="emailId" name="emailId" value="${user.emailId}"><br>
            <button type="submit" style="background-color: #007bff; color: #fff;">Update User</button>
          </form>
        </body>
      </html>
        `);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error updating user');
    });
});

// Update a user (POST request to update the data)
app.post('/updateUser', (req, res) => {
  const userId = req.body.userId;
  const newPassword = req.body.password;
  const newEmailId = req.body.emailId;

  UserData.findOne({ userId })
    .then((user) => {
      if (user) {
        user.password = newPassword;
        user.emailId = newEmailId;

        return user.save();
      } else {
        res.status(404).send('User not found');
      }
    })
    .then(() => {
      console.log('User data updated successfully');
      res.redirect('/allUsers');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error updating user');
    });
});

const server = app.listen(port, () => {
  const address = server.address();
  console.log(`Server is running on http://localhost:${address.port}`);
});
