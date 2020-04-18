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

class CoursesHomePageScreen extends React.Component {
  static navigationOptions = { headerShown: false  };
  static contextType = DataItemsContext

  render() {
    const { loading, coursesData } = this.context
    const { navigation } = this.props
    const topic = navigation.getParam("topic")
    return (
      <>
        { loading ?
          <LoadingData /> :
          <Container>
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
                <TouchableOpacity
                  onPress={() => navigation.goBack() }
                  style={{ position: "absolute", top: 50, right: 20 }}
                >
                  <CloseView>
                    <Ionicons name="ios-close" size={36} color="black"  />
                  </CloseView>
                </TouchableOpacity>
              </Hero>
              <CoursesByTopic
                data={coursesData[topic]}
                navigation={navigation}
                topic={topic}
              />
            </ScrollView>
          </Container>
        }
      </>

    );
  }
}

export default CoursesHomePageScreen;


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
  width: 100%;
  height: 100%;
  top: 0;
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


const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: 600;
  margin: 45px auto 15px;
  width: 80%;
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
