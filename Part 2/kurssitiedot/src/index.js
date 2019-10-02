import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            <Courses courses={courses} />
        </div>
    )
}

const Courses = ({courses}) => {
    return (
    courses.map(course =>
        <Course course = {course} />)
    )
}

const Course = ({course}) => {
    return (
        <div>
        <Header header = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
        </div>
    )
}

const Header = ({header}) => {
    return (
    <div>
        <h2>
            {header}
        </h2>
    </div>
    )
}

const Content = ({parts}) => {
    console.log(parts)
    const rows = () => parts.map(part =>
        <Part
          key={part.id}
          part={part} 
        />
    )

    return (
    <div>
        {rows()}
    </div>
    )
}
 
const Total = ({parts}) => <p>Total of {parts.reduce((exercises, part) => exercises + part.exercises, 0)} exercises</p>

const Part = ({part}) => {
    
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))