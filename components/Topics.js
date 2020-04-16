import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'


const Topics = ({ data, navigation }) => {
  return (
    <ScrollView
      horizontal={true}
      style={{ paddingBottom: 30 }}
      showsHorizontalScrollIndicator={false}
    >
      <CardsContainer>
        {CoursesList.map(course => {
          let topic = course.name
          return (
            <TouchableOpacity
              key={topic}
              // onPress={() => navigation.push("Cards", { topic })}
              onPress={() => navigation.push("Courses", { topic })}
            >
              <Container>
                <Image source={course.image} />
                <Name>{topic.replace(topic[0], topic[0].toUpperCase()).replace('_', " ")} Courses</Name>
                <Img
                  source={{uri: data[topic][0].img}}
                  style={{ width: topic==="react_native" ? 42 : 50 }}
                />
                <Duration>{data[topic].length} courses</Duration>
              </Container>
            </TouchableOpacity>
          )
        })}
      </CardsContainer>
    </ScrollView>

  )
}


const CoursesList = [
  { name: "react" , image: require("../assets/background1.jpg")},
  { name: "react_native" , image: require("../assets/background10.jpg")},
  { name: "redux" , image: require("../assets/background9.jpg")},
  { name: "graphql" , image: require("../assets/background8.jpg")},
  { name: "pathway" , image: require("../assets/background4.jpg")}
]


export default Topics


const Container = styled.View`
  width: 210px;
  height: 200px;
  border: .5px solid rgb(44, 48, 55);
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-left: 20px;
  margin-top: 10px;
  overflow: hidden;
`

const CardsContainer = styled.View`
  flex-direction: row;
`;


const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -30;
  width: 100%;
  height: 100%;
`;

const Name = styled.Text`
  position: absolute;
  z-index: 12;
  top: 10px;
  left: 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  width: 180px;
`;


const Img = styled.Image`
  height: 45px;
`;

const Duration = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  position: absolute;
  z-index: 12;
  bottom: 20px;
  left: 15px;
`;
