import React from "react";
import styled from "styled-components";
import { TouchableOpacity, StatusBar, Linking, Dimensions  } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const screenHeight = Dimensions.get("window").height


class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

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
    const course = navigation.getParam("course")
    const topic = navigation.getParam("key")

    return (
      <Container>
        <StatusBar translucent />
        <Cover>
          <Img source={{uri: course.img}} />
          <Wrapper>
            <Logo source={{ uri: course.img}} />
            <Topic>{topic}</Topic>
          </Wrapper>
          <Name>{course.name}</Name>
          <Author>{course.author}</Author>

        </Cover>
        <TouchableOpacity
          onPress={() => navigation.goBack() }
          style={{
            position: "absolute",
            top: 40,
            right: 20
          }}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={36}
              style={{ marginTop: -2 }}
              color="#4775f2"
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <Subtitle>Short Description:</Subtitle>
          <Text>{course.description}</Text>
          <Subtitle>Price:</Subtitle>
          <Text>{course.price}</Text>
          <Subtitle>Duration:</Subtitle>
          <Text>{course.duration}</Text>
          <Subtitle>Link to Resource:</Subtitle>
          <Link style={{color: "blue"}} onPress={() => this._goToURL(course.link)}>Go to Start Learning Right Now!</Link>
        </Content>
      </Container>
    );
  }
}

export default SectionScreen;



const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
  background: #3c4560;
`;

const Img = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 35px;
  background: #3c4560;
`;

const Name = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Author = styled.Text`
  color: white;
  font-size: 17;
  position: absolute;
  bottom: 0;
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

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Topic = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: 90%;
  width: 90%;
  margin: auto;
  margin-top: 50px;
`;

const Subtitle = styled.Text`
  color: #8b91a2;
  font-weight: 800;
  font-size: 15px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const Link = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;
