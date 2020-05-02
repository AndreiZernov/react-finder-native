import React from "react";
import {
  TouchableOpacity,
  StatusBar,
  Linking,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import TopicsByPlatformCourse from "../components/TopicsByPlatformCourse";

const screenHeight = Dimensions.get("window").height;

class CoursesByPlatformScreen extends React.Component {
  static navigationOptions = { headerShown: false };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("data");
    const platform = navigation.getParam("topic");
    const image = navigation.getParam("image");

    return (
      <RootView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Container>
          <SafeAreaView>
            <ScrollView
              style={{ height: "100%" }}
              showsVerticalScrollIndicator={false}
            >
              <Cover>
                <Img source={image} />
                <PlatformName>{platform.toUpperCase()} PLATFORM</PlatformName>
                <NumberCourses>{data[platform].length} courses</NumberCourses>
              </Cover>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", top: 20, right: 20 }}
              >
                <CloseView>
                  <Ionicons
                    name="ios-close"
                    size={36}
                    style={{ marginTop: -2 }}
                    color="black"
                  />
                </CloseView>
              </TouchableOpacity>
              <CoursesContainer>
                {data[platform].map(course => {
                  let topic = course.parent1;
                  return (
                    <Wrapper key={course.id + course.name}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push("Section", {
                            course,
                            topic
                          })
                        }
                      >
                        <TopicsByPlatformCourse data={course} />
                      </TouchableOpacity>
                    </Wrapper>
                  );
                })}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </Container>
      </RootView>
    );
  }
}

export default CoursesByPlatformScreen;

const RootView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: 32px;
`;

const Container = styled.View``;

const Cover = styled.View`
  height: 370px;
  justify-content: center;
  align-items: center;
`;

const Img = styled.Image`
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  background: #3c4560;
`;

const PlatformName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 70%;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const NumberCourses = styled.Text`
  color: #b8bfd4;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 300px;
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

const CoursesContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  margin: 0 15px 10px;
`;
