import React from 'react';
import ReactDOM from 'react-dom'

const PageHeader = (props) => {
  return (
  <h1>{props.pageHeader}</h1>
  )
}

const Header = (props) => {
  return (
    <h2>{props.course.name}</h2>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = (props) => {
  const getSum = (total, part) => (
    total + part.exercises
  )
  
  const total = (parts) => (
    parts.reduce(getSum, 0)
  )
  
  return (
    <div>
      <b>
        total of {total(props.course.parts)} exercises
      </b>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )  
}

const Courses = (props) => {
  return (
    <div>
      {props.courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
      id: 2,
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

  const pageHeader = 'Web development curriculum'

  return (
    <div>
      <PageHeader pageHeader={pageHeader} />
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
