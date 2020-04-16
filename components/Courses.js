import React from "react"
import styled from "styled-components"
import Course from "../components/Course"
import { useDataItems } from "../contexts/dataItemsContext"


const Courses = () => {
  const { loading, coursesData } = useDataItems()

  return (
    <CoursesContainer>
      {!loading && coursesData.redux.map(course =>
        <Course data={course} key={course.id}/>
      )}
    </CoursesContainer>

  )
}


export default Courses

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
