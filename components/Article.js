import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const getCourseWidth = screenWidth => {
  let cardWidth = screenWidth - 50;
  if (screenWidth >= 700) {
    cardWidth = (screenWidth - 150) / 2;
  } else if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 190) / 3;
  }
  return cardWidth;
};

class Article extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout);
  }
  componentWillUnmoung() {
    Dimensions.removeEventListener("change", this.adaptLayout);
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    });
  };

  render() {
    let { data } = this.props;
    return (
      <Container style={{ width: this.state.cardWidth }}>
        <Cover>
          <Image source={{ uri: data.img }} />
        </Cover>
        <Content>
          <Name>{data.title}</Name>
          <Duration>{data.duration}</Duration>
        </Content>
      </Container>
    );
  }
}

export default Article;

const Container = styled.View`
  width: 335px;
  height: 335px;
  border-radius: 14px;
  border: 0.5px solid silver;
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

const Content = styled.View`
  justify-content: center;
  height: 75px;
`;

const Name = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: 600;
  width: 300px;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const Duration = styled.Text`
  font-size: 15px;
  color: grey;
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 20px;
`;
