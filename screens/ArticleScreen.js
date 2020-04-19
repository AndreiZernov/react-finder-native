import React from "react";
import styled from "styled-components";
import { TouchableOpacity, StatusBar, Linking, Dimensions, ScrollView, SafeAreaView  } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const screenHeight = Dimensions.get("window").height



class ArticleScreen extends React.Component {
  static navigationOptions = { headerShown: false };

  _goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render() {
    const { navigation } = this.props
    // const course = navigation.getParam("course")
    // const topic = navigation.getParam("topic")
    // const BackColor = () => {
    //   return topic === "react" ?  "rgb(20, 20, 20)" :
    //     topic === "react_native" ?  "rgba(38, 48, 52, 1)" :
    //     topic === "redux" ?  "rgb(3, 3, 3)" :
    //     topic === "graphql" ?  "rgb(5, 5, 5)" :
    //     topic === "pathway" ?  "rgb(4, 4, 4)" : "rgb(20, 20, 20)"
    // }
    // const videoLink = navigation.state.params.course.link


    return (
      <RootView>
        {/* <Img source={ */}
        {/* // topic === "react" ? require("../assets/background1.jpg") :
          // topic === "react_native" ? require("../assets/background10.jpg") :
          // topic === "redux" ? require("../assets/background9.jpg") :
          // topic === "graphql" ? require("../assets/background8.jpg") :
          // topic === "pathway" ? require("../assets/background4.jpg") :
          // require("../assets/background1.jpg")
        // } /> */}
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
        <Container>
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <Cover>
                {/* <Name>{course.name}</Name> */}
                {/* <Author>{course.author}</Author> */}
              </Cover>

              <TouchableOpacity
                onPress={() => navigation.goBack() }
                style={{ position: "absolute", top: 15, right: 20 }}
              >
                <CloseView>
                  <Ionicons name="ios-close" size={34} color="black"  />
                </CloseView>
              </TouchableOpacity>

              <Content >
                <Subtitle>Short Description:</Subtitle>
                {/* <Text>{course.description}</Text> */}
                <Subtitle>Price:</Subtitle>
                {/* <Text style={{color:"tomato"}}>{course.price}</Text> */}
                <Subtitle>Duration:</Subtitle>
                {/* <Text>{course.duration}</Text> */}
                <Subtitle>Link to Resource:</Subtitle>
                {/* <Link onPress={() => this._goToURL(course.link)}>Start Learning Right Now!</Link> */}
              </Content>
            </ScrollView>
          </SafeAreaView>
        </Container>
      </RootView>
    );
  }
}

export default ArticleScreen;


const RootView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: 30px;
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

const Content = styled.View`
  height: 100%;
  width: 100%;
  padding: 0 5%;
  margin: 10px auto 20%;
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
