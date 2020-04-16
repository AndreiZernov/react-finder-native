import React from "react";
import { Text } from "react-native";
import styled from 'styled-components/native'


const Card = ({data, priceImg}) => (
  <Container>
    <Image source={
      data.parent1 === "react" ? require("../assets/background1.jpg") :
      data.parent1 === "react_native" ? require("../assets/background10.jpg") :
      data.parent1 === "redux" ? require("../assets/background9.jpg") :
      data.parent1 === "graphql" ? require("../assets/background8.jpg") :
      data.parent1 === "pathway" ? require("../assets/background4.jpg") :
      require("../assets/background1.jpg")
    } />
    <Image />
    <Cover>
      <Name>{data.name}</Name>
      <Img source={priceImg} />
    </Cover>
    <Content>
      <Img source={{uri: data.img}} />
      <Wrapper>
        <Author>{data.author}</Author>
        <Duration>{data.duration}</Duration>
      </Wrapper>
    </Content>
  </Container>
);


const Container = styled.View`
  width: 210px;
  height: 200px;
  border: .5px solid rgb(44, 48, 55);
  border-radius: 20px;
  margin-left: 20px;
  margin-top: 10px;
  overflow: hidden;
`

const Cover = styled.View`
  width: 100%;
  height: 100px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 20px;
`;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Name = styled.Text`
  z-index: 12;
  color: white;
  font-size: 16px;
  font-weight: bold;
  width: 125px;
  margin-right: 10px;

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

const Img = styled.Image`
  width: 35px;
  height: 35px;
`;

const Author = styled.Text`
  color: white;
  width: 125px;
  font-size: 13px;
  font-weight: 600;
`;

const Duration = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 4px;
`;


export default Card
