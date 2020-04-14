import React from "react";
import styled from "styled-components";

const Courses = ({data}) => {
    return(
      <Container>
        <Cover>
          <Image source={require("../assets/background1.jpg")} />
          <Title>{data[0].name}</Title>
          <Img source={{uri: data[0].img}} />
          <Author>{data[0].author}</Author>
        </Cover>
        <Description>{data[0].description}</Description>
      </Container>

    )
  }



export default Courses;


const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background: rgb(20, 20, 20);
  border: 1px solid rgb(87, 90, 92);
`;


const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;

`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 280px;
`;

const Img = styled.Image`
  position: absolute;
  top: 110px;
  left: 110px;
  width: 90px;
  height: 100px;
`;

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Description = styled.Text`
  font-size: 14px;
  margin: 20px;
  line-height: 24px;
  color: #b8bece;
`;
