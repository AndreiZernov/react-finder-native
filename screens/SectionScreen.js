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
import { PlayIcon } from "../components/Icons";
import { BackColor, BackImage } from "../data/BackgroundData";
import { _goToURL } from "../data/LinkFunc";

const screenHeight = Dimensions.get("window").height;

class SectionScreen extends React.Component {
  static navigationOptions = { headerShown: false };

  render() {
    const { navigation } = this.props;
    const course = navigation.getParam("course");
    const topic = navigation.getParam("topic");
    const videoLink = navigation.state.params.course.link;

    return (
      <RootView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Container>
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <Cover>
                <Img source={BackImage(topic)} />
                <LogoWrapper
                  style={{ width: topic === "react_native" ? 83 : 100 }}
                >
                  <Logo source={{ uri: course.img }} />
                  {videoLink.includes("youtube") && (
                    <PlayWrapper>
                      <TouchableOpacity
                        underlayColor="transparent"
                        onPress={() => navigation.push("Video", { videoLink })}
                      >
                        <PlayView>
                          <PlayIcon style={{ marginLeft: -10 }} />
                        </PlayView>
                      </TouchableOpacity>
                    </PlayWrapper>
                  )}
                </LogoWrapper>
                <Name>{course.name}</Name>
                <Author>{course.author}</Author>
              </Cover>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", top: 15, right: 20 }}
              >
                <CloseView>
                  <Ionicons name="ios-close" size={34} color="black" />
                </CloseView>
              </TouchableOpacity>

              <Content style={{ backgroundColor: BackColor(topic) }}>
                <Subtitle>Short Description:</Subtitle>
                <Text>{course.description}</Text>
                <Subtitle>Price:</Subtitle>
                <Text style={{ color: "tomato" }}>{course.price}</Text>
                <Subtitle>Duration:</Subtitle>
                <Text>{course.duration}</Text>
                <Subtitle>Link to Resource:</Subtitle>
                <Link onPress={() => _goToURL(course.link)}>
                  Start Learning Right Now!
                </Link>
              </Content>
            </ScrollView>
          </SafeAreaView>
        </Container>
      </RootView>
    );
  }
}

export default SectionScreen;

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
  justify-content: center;
`;

const Name = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 70%;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Author = styled.Text`
  color: white;
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

const LogoWrapper = styled.View`
  width: 100px;
  height: 90px;
`;

const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  height: 100%;
  width: 100%;
  padding: 0 5%;
  margin: 0 auto 20%;
`;

const Subtitle = styled.Text`
  color: #8b91a2;
  font-weight: 800;
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Text = styled.Text`
  width: 80%;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;

const Link = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;

const PlayWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
`;

const PlayView = styled.View`
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;
