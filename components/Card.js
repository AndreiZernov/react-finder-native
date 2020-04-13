import React from "react";
import { Text } from "react-native";
import styled from 'styled-components/native'


const Card = ({data, priceImg}) => (
  <Container>
    {/* <Image source={props.image} /> */}
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
  background-color: white;
  width: 250px;
  height: 250px;
  border: 1px solid rgb(27, 31, 38);
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(89, 190, 255, 0.15);
  margin-left: 20px;
  margin-top: 20px;
  overflow: hidden;
`

const Cover = styled.View`
  width: 100%;
  height: 150px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 20px;
`;

const Image = styled.Image`
  background: rgb(47, 54, 65);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Name = styled.Text`
  z-index: 12;
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
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
  font-size: 15px;
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
