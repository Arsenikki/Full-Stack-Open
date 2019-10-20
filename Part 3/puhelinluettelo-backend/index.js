require('dotenv').config();

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()));
  });
});

app.get('/info', (req, res) => {
  let personCount = 0;
  Person.find({}).then(p => {
    personCount = p.length;
    res.write(`Phonebook has info for ${personCount} people \n`);
    const date = Date(Date.now());
    res.write(`${date}`);
    res.end();
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(204).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons', ({ body }, response) => {
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number
  });
  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
