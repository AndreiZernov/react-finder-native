import React from "react";
import styled from "styled-components";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width


const getCourseWidth = (screenWidth) => {
  let cardWidth = screenWidth - 40
  if (screenWidth >= 700) {
    cardWidth = (screenWidth - 60) / 2
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3
  }
  return cardWidth
}

class Course extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout)
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    })
  }

  render() {
    let { data } = this.props
    return (
      <Container style={{ width: this.state.cardWidth }}>
        <Cover>
          <Image source={{uri:data.img}} />
          {/* <Img source={{uri:data.img}} resizeMode="contain" /> */}
          <Duration>{data.duration}</Duration>
          <Name>{data.name}</Name>
        </Cover>
        <Content>
          <Avatar source={{uri:data.img}} />
          <Description>{data.description.substring(0, 60)+'...'}</Description>
          <Author>Taught by {data.author}</Author>
        </Content>
      </Container>
    )
  }
}


export default Course;


const Container = styled.View`
  width: 335px;
  height: 335px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin: 10px auto;
`;

const Cover = styled.View`
  height: 260px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  background: rgb(47, 54, 65);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


const Img = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Name = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  width: 170px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Duration = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 20px;
`;


const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
  max-width: 260px;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
