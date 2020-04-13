import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";


class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
            <Logo source={course.img} />
            <Topic>{topic}</Topic>
          </Wrapper>
          <Name>{course.name}</Name>
          <Author>{course.author}</Author>
          
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
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
