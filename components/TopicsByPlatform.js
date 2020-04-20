import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'


const TopicsByPlatform = ({ data, navigation }) => {
  return (
    <ScrollView
      horizontal={true}
      style={{ paddingBottom: 30 }}
      showsHorizontalScrollIndicator={false}
    >
      <CardsContainer>
        {PlatformList.map(platform => {
          let topic = platform.name
          let image = platform.image
          return (
            <TouchableOpacity
              key={topic}
              onPress={() => navigation.push("CoursesByPlatform", { topic, image, data })}
            >
              <Container>
                <Image source={platform.image} />
                <Name>{topic.replace(topic[0], topic[0].toUpperCase()).replace('_', " ")} Courses</Name>
                <Number>{data[platform.name].length} courses</Number>
              </Container>
            </TouchableOpacity>
          )
        })}
      </CardsContainer>
    </ScrollView>

  )
}


const PlatformList = [
  { name: "youtube" , image: require("../assets/youtube.jpg")},
  { name: "udemy" , image: require("../assets/udemy.jpg")},
  { name: "egghead" , image: require("../assets/egghead.png")},
  { name: "freecodecamp" , image: require("../assets/freecodecamp.jpg")},
  { name: "codecademy" , image: require("../assets/codecademy.png")},
  { name: "coursera" , image: require("../assets/coursera.png")},
  { name: "edx" , image: require("../assets/edx.jpg")},
  { name: "treehouse" , image: require("../assets/treehouse.jpg")}

]


export default TopicsByPlatform


const CardsContainer = styled.View`
  flex-direction: row;
  margin: 0 auto;
`;

const Container = styled.View`
  width: 210px;
  height: 200px;
  border: .5px solid rgb(70, 70, 70);
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-left: 20px;
  margin-top: 10px;
  overflow: hidden;
`

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

const Number = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  position: absolute;
  z-index: 12;
  bottom: 20px;
  left: 15px;
`;
