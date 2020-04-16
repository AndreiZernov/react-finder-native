import React from 'react'
import styled from 'styled-components/native'
import { StatusBar } from "react-native";
import LottieView from "lottie-react-native"


export default function LoadingData() {
  let tabBarVisible = false;
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
      <BackImg source={require("../assets/background6.jpg")} />
      <LottieView
        source={require("../assets/lottie-react-logo.json")}
        autoPlay={true}
        loop={true}
        ref={animation => { this.animation = animation }}
      />
      <TitleBar>
        <Title>React Finder</Title>
        <Name>Your guide to React JavaScript library Everything about Learning React for Free at one place</Name>
      </TitleBar>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: rgb(27, 31, 38);
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const BackImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -20;
  opacity: .7;
  top: 0;
`;

const TitleBar = styled.View`
  width: 80%;
  margin: auto auto 35%;
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
  width: 220px;
  margin: 0 auto 10px;
`;
