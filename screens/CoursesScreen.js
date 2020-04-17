import React from "react"
import { Dimensions, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from "react-native"
import styled from "styled-components"
import { DataItemsContext } from "../contexts/dataItemsContext"
import QuickFacts from '../data/QuickFacts'
import Card from '../components/Card'
import { Ionicons } from '@expo/vector-icons'
import LoadingData from "../components/LoadingData"
import ModalLogin from "../components/ModalLogin"


let screenWidth = Dimensions.get("window").width;

class CoursesScreen extends React.Component {
  static navigationOptions = { headerShown: false  };
  static contextType = DataItemsContext

  render() {
    const { loading, coursesData } = this.context
    const { navigation } = this.props
    let topic = ''
    if (navigation.getParam("topic")) {
      topic = navigation.getParam("topic")
    } else if (navigation.getParam("nextTopic")) {
      topic = navigation.getParam("nextTopic")
    } else if (navigation.getParam("prevTopic")) {
      topic = navigation.getParam("prevTopic")
    } else {
      topic = 'react'
    }
    const nextTopic = nextTopicFunc(topic)
    const prevTopic = prevTopicFunc(topic)
    return (
      <>
        { loading ?
          <LoadingData /> :
          <Container>
            <SafeAreaView>
              <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
              <ScrollView style={{ height: "100%" }}>
                <Hero>
                  <Background source={ require("../assets/background6.jpg") } />
                  <Title>{QuickFacts[topic].title}</Title>
                  <Text>{QuickFacts[topic].subtitle}</Text>
                  {QuickFacts[topic].list.map(item =>
                    <TextList key={item}>{item}</TextList>
                  )}

                  <Name>Number of courses: {coursesData[topic].length}</Name>
                  <IconsWrapper>
                    <TouchableOpacity
                      onPress={() => navigation.push("Courses", { prevTopic })}
                    >
                      <IconView>
                        <Ionicons name="ios-arrow-dropleft-circle" size={50}  color="#d4dffe" />
                      </IconView>

                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.push("Courses", { nextTopic })}
                    >
                      <IconView>
                        <Ionicons name="ios-arrow-dropright-circle" size={50}  color="#d4dffe" />
                      </IconView>
                    </TouchableOpacity>
                  </IconsWrapper>
                </Hero>
                <CoursesByTopic
                  data={coursesData[topic]}
                  navigation={navigation}
                  topic={topic}
                />
              </ScrollView>
            </SafeAreaView>
          </Container>
        }
      </>
    );
  }
}

export default CoursesScreen;


const CoursesByTopic = ({topic, data, navigation}) =>
  <Cover>
    <Subtitle>{topic.replace(topic[0], topic[0].toUpperCase()).replace('_', " ")} Learning</Subtitle>
    <ScrollView
      horizontal={true}
      style={{ paddingBottom: 30 }}
      showsHorizontalScrollIndicator={false}
    >
      {data.map(course => {
        return(
          <CardsContainer key={course.id}>
            <TouchableOpacity
              onPress={() => navigation.push("Section", { course, topic })}
            >
              <Card data={course} />
            </TouchableOpacity>
          </CardsContainer>
        )})}
    </ScrollView>
  </Cover>


const nextTopicFunc = (topic) => {
  return topic === "react" ?  "react_native" :
    topic === "react_native" ?  "redux" :
    topic === "redux" ?  "graphql" :
    topic === "graphql" ?  "pathway" :
    topic === "pathway" ?  "react" : "react"
}

const prevTopicFunc = (topic) => {
  return topic === "react" ?  "pathway" :
    topic === "pathway" ?  "graphql" :
    topic === "graphql" ?  "redux" :
    topic === "redux" ?  "react_native" :
    topic === "react_native" ?  "react" : "react"
}



const Container = styled.View`
  background: rgb(18, 21, 26);
`;

const Hero = styled.View`
  height: 450px;
  background: rgb(27, 31, 38);
  overflow: hidden;
`;

const Background = styled.Image`
  position: absolute;
  left: 0;
  width: ${screenWidth}px;
  height: 100%;
`;

const IconsWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 78%;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  opacity: 0.2;

`;
const IconView = styled.View``;
const Cover = styled.View`
  background-color: rgb(22, 22, 22);
`;

const CardsContainer = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: 600;
  margin: 45px auto 15px;
  width: 94%;
  text-align: center;
`;

const Text = styled.Text`
  text-align: justify;
  font-size: 14px;
  color: #b8bece;
  margin-left: 10px;
  width: 94%;
`
const TextList = styled.Text`
  font-size: 12px;
  color: #b8bece;
  margin: 5px auto 0;
  width: 94%;
`

const Name = styled.Text`
  margin-left: 8px;
  color: tomato
  margin: 20px;
  margin-top: auto;

`;

const Subtitle = styled.Text`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
  margin: 20px 0 0 20px;
`;
