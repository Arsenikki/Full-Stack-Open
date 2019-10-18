const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
        name: "Tupu",
        number: "123456",
        id: 1
    },
    {
        name: "Hupu",
        number: "045-505050020",
        id: 2
    },
    {
        name: "Lupu",
        number: "044-1313513",
        id: 3
    },
    {
        name: "Aku",
        number: "044-13443513",
        id: 4
    },
    {
        name: "Iines",
        number: "044-43545",
        id: 5
    },
]

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.write(`Phonebook has info for ${persons.length} people \n`)
    let date = new Date(Date.UTC(2010, 01, 28))
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})