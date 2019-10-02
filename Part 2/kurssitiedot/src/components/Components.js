import React from 'react'

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

export default Courses