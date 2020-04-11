import React from "react";
import { Text } from "react-native";
import styled from 'styled-components/native'


const Card = props => (
  <Container>
    <Image source={require("../assets/logo-react.png"  )} />
    <Cover>
      <Title>React Course</Title>
    </Cover>
    <Content>
      <Logo source={require("../assets/logo-react.png")} />
      <Wrapper>
        <Caption>Author</Caption>
        <Subtitle>Name of the Course</Subtitle>
      </Wrapper>
    </Content>
  </Container>
);


const Container = styled.View`
  background-color: white;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(89, 190, 255, 0.15);
  margin-left: 20px;
  margin-top: 20px;
  overflow: hidden;
`

const Cover = styled.View`
  width: 100%;
  height: 170px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const Image = styled.Image`
  background: rgb(47, 54, 65);
  position: absolute;
  filter: brightness(0.4);
  top: 0;
  left: 0;
  width: 130%;
  height: 100%;
`;

const Title = styled.Text`
  z-index: 12;
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
  margin-top: 20px;
  margin-left: 20px;
`;


const Content = styled.View`
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  margin-top: 4px;
`;


export default Card
