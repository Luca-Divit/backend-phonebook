const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

// Create a custom token for morgan middleware
morgan.token('body', (req, res) => JSON.stringify(req.body))
// Pass all the tokens including the custom one
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/phonebook', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const peopleCount = persons.length;
  const date = new Date();
  const layout = `
    <p>Phonebook has info for ${peopleCount} people</p>
    <p>${date}</p>
  `
  response.send(layout);
});

app.get('/api/phonebook/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    response.json(person)
  } else {
    response.statusMessage = 'Person is not in the database'
    response.status(404).end()
  }
});

app.delete('/api/phonebook/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
  } else {
    response.statusMessage = 'This person does not exist in the database'
    response.status(404).end()
  }
});

app.post('/api/phonebook', (request, response) => {
  // Get the data of the body of the request
  const body = request.body;
  // Return 400 if the request is missing some info
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing info'
    });
  }
  // Check if the name is already in the phonebook
  const person = persons.find(p => p.name === body.name);
  if (person) {
    return response.status(400).json({
      error: 'Person already in the phonebook'
    });
  }
  // Create random id using Math.random
  const randId = Math.random() * 1000000;
  // Assign the randId to the person
  body.id = randId;
  // Add the person to the phonebook
  persons = persons.concat(body);
  // console.log(person);
  // Respond to the request sending the person back as json object
  response.json(body);
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// console.log("hello world");
