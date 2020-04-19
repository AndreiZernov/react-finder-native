import React from "react";
import styled from "styled-components";
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width


const getCourseWidth = (screenWidth) => {
  let cardWidth = screenWidth - 40
  if (screenWidth >= 680) {
    cardWidth = (screenWidth - 150) / 2
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 190) / 3
  }
  return cardWidth
}

class TopicsByPlatformCourse extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout)
  }
  componentWillUnmoung() {
    Dimensions.removeEventListener("change", this.adaptLayout)
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
          <Image source={
            data.parent1 === "react" ? require("../assets/background1.jpg") :
            data.parent1 === "react_native" ? require("../assets/background10.jpg") :
            data.parent1 === "redux" ? require("../assets/background9.jpg") :
            data.parent1 === "graphql" ? require("../assets/background8.jpg") :
            data.parent1 === "pathway" ? require("../assets/background4.jpg") :
            require("../assets/background1.jpg")
          } />
          {/* <Img source={{uri:data.img}} resizeMode="contain" /> */}
          <Name>{data.name}</Name>
          <Duration>{data.duration}</Duration>
          <Author>Taught by {data.author}</Author>
        </Cover>
      </Container>
    )
  }
}


export default TopicsByPlatformCourse;


const Container = styled.View`
  height: 335px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin: 10px auto;
`;

const Cover = styled.View`
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
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
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  width: 250px;
  margin-bottom: auto;
  margin-left: 20px;
`;

const Duration = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 20px;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-bottom: 20px;
  margin-left: 20px;
`;
