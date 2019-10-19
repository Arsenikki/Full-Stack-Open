require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    res.write(`Phonebook has info for ${persons.length} people \n`)
    var date = Date(Date.now()); 
    res.write(`${date}`);
    res.end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log("boodyy", body)
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
    } else if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })  
    } else if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({ 
            error: 'Name must be unique!' 
        })  
    } else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateId()
        }
        persons = persons.concat(person)
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})