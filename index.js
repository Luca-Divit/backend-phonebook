const express = require('express');
const app = express();

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
})

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
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// console.log("hello world");
