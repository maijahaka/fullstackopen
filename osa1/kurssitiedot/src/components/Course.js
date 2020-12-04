import React from 'react'

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

export default Course