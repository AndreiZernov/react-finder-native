import React from "react"
import styled from "styled-components"
import { Animated, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { BackColor, BackImage } from '../data/BackgroundData'

class Cards extends React.Component {
  state = {
    textHeight: new Animated.Value(128)
  }

  render() {
    const { data } = this.props

    return (
      <AnimatedContainer style={{ backgroundColor: BackColor(data.parent1) }}>
        <Cover>
          <Image source={BackImage(data.parent1)}/>
          <AnimatedTitle>{data.name}</AnimatedTitle>
          <LogoWrapper style={{ width: data.parent1==="react_native" ? 83 : 100 }}>
            <Img source={{uri: data.img}} />
          </LogoWrapper>

          <Author>{data.author}</Author>
          <Data>{data.date.split('T')[0]}</Data>
        </Cover>
        <AnimatedContent style={{ height: this.state.textHeight }}>
          <Subtitle>Short Description:</Subtitle>
          <Description>{data.description}</Description>
        </AnimatedContent>
        <AnimatedLinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
          style={{ position: "absolute", zIndex: 1000, top: 330, width: "100%", height: this.state.textHeight }}
        />
      </AnimatedContainer>
    )
  }
}


export default Cards


const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background: rgb(20, 20, 20);
  border: 0.3px solid rgb(64, 67, 69);
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  width: 200px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title)

const LogoWrapper = styled.View`
  width: 100px;
  height: 90px;
  position: absolute;
  top: 35%;
  left: 36%;
`;

const Img = styled.Image`
  width: 100%;
  height: 100%;
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

const Data = styled.Text`
  position: absolute;
  bottom: 20px;
  right: 10px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  margin-right: 10px;
  padding: 5px;
  background: tomato;
  border-radius: 10px;
  width: 90px;
`;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Content = styled.View`
  width: 90%;
  margin: 20px auto;
  overflow: hidden;
`;

const AnimatedContent = Animated.createAnimatedComponent(Content);

const Subtitle = styled.Text`
  color: #8b91a2;
  font-weight: 800;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Description = styled.Text`
  width: 80%;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;
