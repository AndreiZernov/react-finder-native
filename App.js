import React from "react";
import { Text } from "react-native";
import styled from 'styled-components/native'
import Card from './components/Card'

export default function App() {
  return (
    <Container>
      <TitleBar>
        <Avatar source={require('./assets/react.png')} />
        <Title>React Finder</Title>
        <Name>Your guide to React JavaScript library Everything about Learning React for Free at one place</Name>
        <Subtitle>Continue Learning</Subtitle>
        <Card />
      </TitleBar>
    </Container>
  );
}

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin: 0 auto 30px;
`;


const Container = styled.View`
  flex: 1;
  background: rgb(27, 31, 38);
  justify-content: center;
  align-items: center;
`;

const TitleBar = styled.View`
width: 80%;
`;

const Title = styled.Text`
  font-size: 40px;
  text-align: center;
  color: #b8bece;
  font-weight: 700;
`;

const Name = styled.Text`
  text-align: center;
  font-size: 12px;
  color: rgb(89, 190, 255);
  font-weight: bold;
  width: 80%;
  margin: auto;
`;


const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 50px;
  text-transform: uppercase;
`;
