// In this section we will learn how to create API's using node
// Unlike in otherModules.js here we will look at the API's from the scope of building real-world apps
// That being said these API's will be much more complicated
// In this section we will be using a framework called "Express"
// This framework is made for building web applications 
// We can install it using NPM as shown in the "npm.js" file

// There are four key HTTP methods, them being:
// GET: for getting data
// POST: for posting data
// PUT: for putting data
// DELETE: for deleting data

// Examples for each of these methods can be with a HTTP request for them

// For GET /api/customers: in this way we get the full list of customers in the form of an array of customer objects
// If we want to get a certain customer then we just need to indicate said customer with a number like 1 or 2

// If we want to update the customer we want to do it with the PUT method
// PUT /api/customers/1: we want to specify the customer we have in mind so we can change only his data
// The customer object needs to be added to the request to further specify what we want to change
// With this request the server will update the customer with the corresponding ID with the new values

// To delete a customer we want to send a request with the DELETE method
// DELETE /api/customers/1: here we don't need to include the customer object because we can delete him with only the ID

// Now to create a customer we want to use the POST method
// POST /api/customers: since we are posting a new customer to customers we don't need to specify an ID
// The customer object needs to be included in the body of the request

// These four methods are what is known as the RESTful convention, which is most widely used

// Express will give us a proper code structure to maintain our reusability
// Here we will create our first web server using Express

const express = require('express')//: here we call the express module that we have installed

const app = express()//This is an object of type express which is a function. We will store it in a const "app"
// This app object has some very useful methods which we will look over Below
// Starting with:

app.get()
app.post()
app.put()
app.delete()
// These correspond with the four HTTP methods that were listed above which allow us to freely manipulate data

// Now for simplicity we want to work with the get method
// We want to implement some endpoints that respond to a http get request
// The method takes two arguments, them being, the target URL and a callback function
// Let's have a look:

app.get('/', (req, res) => {
    res.send("Hello There");
})// I will use ES6 arrow function for the callback
// This is how we define a route, we have defined a URL, and a callback function which serves as a route handler
// We can define a second route pretty much the same way:

app.get('/api/customers', (req, res) => {
    res.send([1, 2, 3])
})

// We also need to listen on a given port like so:

app.listen(3000, () => console.log("I'm listening"))// Here we have defined a listener
// The listener is set to listen on port 3000 and has an added optional callback function
// VERY IMPORTANT to note that if we listen on just port 3000 we will display the first get request
// But if we listen on port 3000/api/customers then we will display the second get request
// Notice how here we don't use any if statements, thus making our code clean and maintainable
// With this structure, the bigger our app gets we won't have problems shifting the code even to other files
// Express gives our application a structure that we can work around

// Now we will have a look at a node package known as nodemon
// The purpose of this package is to simplify a process that I will now explain 
// To load up your app you need to do so using the terminal by targeting the file you wish to start
// It is essentially done like so:

// IN TERMINAL: node (target file, for example index.js)
// It is important to keep in mind that this command runs the code
// But if any changes are made to the code then the process must be stopped using ^C
// That creates the need to restart the app with the node command
// As you can guess, that isn't very convenient, and is what nodemon essentially changes

// Now with nodemon the terminal command changes in a simple way like so:

// IN TERMINAL: nodemon (target file, for example index.js)
// With this command nodemon is now watching all the files in the folder
// Now if you make any changes to your code nodemon will automaticly restart your app


// Now we need to have a look at the app.listen()method closely
// In particular we want to check the port which is being listened to
// In this case it is port 3000, and although it may work on our local machine it won't work in a production environment
// To handle this issue we need to create an environment host variable 
// The environment variable works as follows:

const port = process.env.PORT || 3000 // here "process is a global object", "env" is the property for environment variable and "PORT" is the name of our port
// In short if the environment variable is set we will use it otherwise we will use port 3000
// Now that we have setup the variable we will replace 3000 with it like so:

app.listen(port, () => console.log('listening on port'))

// Now on a local machine we want to create this environment variable using the terminal like so:

// IN TERMINAL: set PORT=5000
// With this command now the app will listen on port 5000 
// The environment variable must be defined in the terminal
// This is the proper way to add a port to your node applications


// Above we defined a route to get a list of customers (line: 59), but now we will use a route to get a single customer
// Let's see how we can implement this:

app.get('/api/customers/:id', (req, res) => {
    res.send(req.params.id)
})
// Here it is noticeable that we added an identifying parameter in this case ":id"
// The parameter can be named anyway we want, but id is highly recommended as it is convenient
// Then in the response we call the id parameter and send it to the client with the contents of the callback function
// We can have more than one parameters in our url like let's say '/api/customers/:id/:name'
// Thus we have another identifying parameter which we can use 


// Next up we want to handle a GET request on a specified object
// We will define an array of objects in this case customers
// We will do as follows:

const customers = [
    {id: 1, name: 'customer1'},
    {id: 2, name: 'customer2'},
    {id: 3, name: 'customer3'}
];

// Now we have defined our customers database and we want to get customer1 in particular
// We would go about doing this like so:

app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id))
  if (!customer) res.status(404).send('The customer was not found')
  res.send(customer)
})

// Now let's explain what we just did
// We store our result in a variable called customer
// We use the find method to locate a given object in the array
// As arguments to the method we present a function that we use to find an object of a matching criteria
// The function in essence is a boolean value in which the id of c equals the request parameter id
// As (req.params.id) will return a string, we use the parseInt method to parse it to an integer
// If we are unable to locate a corresponding customer object then we return a response 404
// 404 is the default response for a missing object
// We can also add a message like in the case shown above
// If we have a corresponding id then we just set the server response to display the customer


// Now let's have a closer look at how to handle POST requests
// With this method we will be creating a new customer
// We would do that like so:

app.post('/api/customers', (req, res) => {
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    }
    customers.push(customer)
    res.send(customer)
})

// What we did above was to create a new customer object that we add to our array of customers
// In the callback code block we create the new customer with the corresponding id and name
// We then push the new customer to the array of customers, adding him to the list
// Then in the response we display the newly added customer

// It needs to be noted that the name object will work only once we enable the parsing of JSON objects
// In express json isn't activated by default, so we activate it like this:

app.use(express.json()) // NOTE: this must be initialized at the top of the request after we get the app object


// Now I want to pay attention to input validation

app.post('/api/customers', (req, res) => {
 if (!req.body.name || req.body.name.length < 3) {
     res.status(400).send('Name has to be at least 3 chars and is required')
     return;
 }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    }
    customers.push(customer)
    res.send(customer)
})

// In this case we are checking the post method name object
// Because we can never trust the server we want to ensure ourselves with logic that can validate our name
// The if statement at the top of the code block handles this operation
// It checks if the name object exists OR if it is at least 3 characters long
// If it does not meet those parameters, then error 400 will occur along with the message
// We place the return statement at the if statement to end the function there if the parameters are not met

// NOTE: this validation logic is way too complicated to be efficient in a real world application
// When keeping in mind that we are validating such a simple object it would pass
// But in real apps our objects will be much more complicated and as such require a more simple approach
// Hence we need to install a small npm package called "joi"
// It will allow us to simplify our logic thus making the code more maintainable
// Now let's use joi to replace our validation logic:

const Joi = require('joi') // We call joi and store it in a variable 

app.post('/api/customers', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
   const result = Joi.validate(req.body, schema)
   if (result.error) {
    res.status(400).send(result.error)
    return;
    }
       const customer = {
           id: customers.length + 1,
           name: req.body.name
       }
       customers.push(customer)
       res.send(customer)
   })

   // As we can see joi really simplifies the process of input validation
   // It makes the logic necessary for the process reusable and simple to implement
   