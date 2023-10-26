var expr=require('express');   //import expressjs by using "require"

var app = expr();           // Initialize expressjs environment

var bparse=require('body-parser');   //Used to add user
bparseinit=bparse.urlencoded({extended:false});

                                                               

var users =[{userID:"100", firstName:"Sathwik", lastName:"Kumar"},

        {userID:"101",firstName:"Subba", lastName:"Reddy"},

        { userID:"102",firstName:"Jaganath",lastName:"Reddy"}];

//http://localhost:8800/getuser?uid=101  ...to execute we need pass values as parameters

//http://localhost:8800/getuser?uid=101&fname=Jaganath

 

function RetrieveUser(request, response){

    var status = false;

    var userid=request.query.uid;   // whatever the userid that client is sending, that is storedin this variable

    var firstName = request.query.fname;

    for( var user of users){

        if(userid == user.userID  && firstName ==  user.firstName){

            status=true;  

            break;
        }

    }

    if(status)

        response.send(user);

    else

        response.end("<b>No employee with ID</b>"+userid);

}

app.get("/getuser",RetrieveUser)


//API to get all users
function getallUsers(request, response)
{
    response.send(users);
}
app.get("/getall", getallUsers )





// API to delete a user by ID
app.delete('/deleteuser/:userId', (request, response) => {
    var userId = request.params.userId;
    var userIndex = users.findIndex(user => user.userID === userId);
  
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      response.send('User with ID ' + userId + ' deleted successfully.');
    } else {
      response.status(404).send('No user found with ID: ' + userId);
    }
  });






function addNewUser(request, response){

    var user_id = request.body.uid;

    var first_Name = request.body.fname;

    var last_Name = request.body.lname;

    var rval=users.push({userID:user_id, firstName:first_Name, lastName:last_Name});

    response.send("<b>User Added</b>"+rval);

}

app.post('/addUser', bparseinit, addNewUser)         










 

function Home(request, response){

    var resp ="<html><body><b>WELCOME to our site....<br><br>";

    resp += "<a href=/welcome> Welcome Page</a></body></html>";

    response.end(resp);            // end function also sends the response ...send also

}

app.get('/',Home)     // if it end with slash, then the function called Home

 

var visitorCount=0;

function Welcome(request, response){

    var today = new Date();

    visitorCount++;

    var resp = "<html><body><b>Today : " + today;

    resp +="<b><br><b>Visitor Count</b> : "+visitorCount;

    resp +="</body></html>";

    response.send(resp)

}

// function takes 2 parameters , request represents the HTTP request

// response represents he HTTP response packet contains the data what the server sends

app.get('/welcome',Welcome);   // get request... Parameters - /welcome means implenting API & Welcome is Action

 

//here this function code is a Node Js code .....we can run by using "node filename"  Ex: node FirstExpress.js  

function feedback(){

    console.log("Server started on  port 8800...");

    console.log("Open the browser and visit http://localhost:8800/welcome")

}

app.listen(8800,feedback)   // listen have so many variations,...parameters - port number & function









/*

var express = require('express');
var app = express();

var users = [
  { userID: "101", firstName: "Jackie", lastName: "Chan" },
  { userID: "102", firstName: "Bruce", lastName: "Lee" },
  { userID: "103", firstName: "Sathwik", lastName: "kumar" }
];

// API to get all users
app.get('/getallusers', (request, response) => {
  response.send(users);
});

// API to get a user by ID
app.get('/getuser/:userId', (request, response) => {
  var userId = request.params.userId;
  var user = users.find(user => user.userID === userId);

  if (user) {
    response.send(user);
  } else {
    response.status(404).send('No user found with ID: ' + userId);
  }
});

// API to delete a user by ID
app.delete('/deleteuser/:userId', (request, response) => {
  var userId = request.params.userId;
  var userIndex = users.findIndex(user => user.userID === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    response.send('User with ID ' + userId + ' deleted successfully.');
  } else {
    response.status(404).send('No user found with ID: ' + userId);
  }
});

function feedback() {
  console.log("Server started on port 8800...");
  console.log("Open the browser and visit http://localhost:8800/welcome");
}

app.listen(8800, feedback);


*/




