import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const course = {
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
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
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
        <h1>
            {header}
        </h1>
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
 
const Total = ({parts}) => <p>Number of exercises {parts.reduce((exercises, part) => exercises + part.exercises, 0)}</p>

const Part = ({part}) => {
    
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))