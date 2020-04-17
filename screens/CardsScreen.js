import React from "react";
import styled from "styled-components";
import Cards from '../components/Cards'
import { PanResponder, Animated, TouchableOpacity } from 'react-native'
import { DataItemsContext } from "../contexts/dataItemsContext"
import { connect } from 'react-redux'
import { Ionicons } from "@expo/vector-icons";


function mapStateToProps(state) {
  return {
    action: state.action
  };
}


class CardsScreen extends React.Component {
  static contextType = DataItemsContext
  static navigationOptions = { headerShown: false };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0)
  };

  getNextIndex = (index) => {
    let nextIndex = index + 1
    if ( nextIndex > this.context.coursesData["react"].length - 1 ) {
        return 0
    }
    return nextIndex
  }


  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
      } else {
        if (this.props.action === "openCard") {
            return false;
        } else {
            return true;
        }
      }
    },

    onPanResponderGrant: () => {
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.spring(this.state.translateY, { toValue: 0 }).start();

      Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
      Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();

      Animated.timing(this.state.opacity, { toValue: 0.5 }).start();
    },

    onPanResponderMove: Animated.event([
        null,
      { dx: this.state.pan.x, dy: this.state.pan.y }
    ]),

    onPanResponderRelease: () => {
      const positionY = this.state.pan.y.__getValue();
      const positionX = this.state.pan.x.__getValue();
      Animated.timing(this.state.opacity, { toValue: 0 }).start();
      const Reverse = () => {
        this.state.pan.setValue({ x: 0, y: 0 });
        this.state.scale.setValue(0.9);
        this.state.translateY.setValue(44);
        this.state.thirdScale.setValue(0.8);
        this.state.thirdTranslateY.setValue(-50);
        this.setState({ index: this.getNextIndex(this.state.index) });
      }
      if (positionY > 250) {
        Animated.timing(this.state.pan, {   toValue: { x: 0, y: 1000 }   }).start(() => Reverse());
      } else if (positionY < -250) {
        Animated.timing(this.state.pan, {  toValue: { x: 0, y: -1000 }  }).start(() => Reverse());
      } else if (positionX > 150) {
        Animated.timing(this.state.pan, { toValue: { x: 1000, y: 0 } }).start(() => Reverse());
      } else if (positionX < -150) {
        Animated.timing(this.state.pan, { toValue: { x: -1000, y: 0 } }).start(() => Reverse());
      } else {
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();

        Animated.spring(this.state.scale, { toValue: 0.9 }).start();
        Animated.spring(this.state.translateY, { toValue: 44 }).start();

        Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
      }
    }
  });

  render() {

    return (
      <Container>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: "absolute", top: 40, right: 10
          }}
        >
          <CloseButton>
            <Ionicons name="ios-close" size={44} color="black" />
          </CloseButton>
        </TouchableOpacity>
        <AnimatedMask style={{ opacity: this.state.opacity }} />
        <BackImg source={require("../assets/background6.jpg")} />

        <Animated.View
          style={{
            transform: [{ translateX: this.state.pan.x }, { translateY: this.state.pan.y }]
          }}
          {...this.panResponder.panHandlers}
        >
          <Cards
            data={this.context.coursesData["react"]
              .filter(course => course.id === this.state.index)}
            canOpen={true}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute', top: 0, left: 0, zIndex: -1,
            width: "100%", height: "100%",
            justifyContent: 'center', alignItems: 'center',
            transform: [
            { scale: this.state.scale },
            { translateY: this.state.translateY }
            ]
          }}
        >
          <Cards
            data={this.context.coursesData["react"].
              filter(course => course.id === this.getNextIndex(this.state.index))}/>

        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute', top: 0, left: 0, zIndex: -3,
            width: "100%", height: "100%",
            justifyContent: 'center', alignItems: 'center',
            transform: [
            { scale: this.state.thirdScale },
            { translateY: this.state.thirdTranslateY }
            ]
          }}
        >
          <Cards data={this.context.coursesData["react"].filter(course => course.id === this.getNextIndex(this.state.index + 1))}/>

        </Animated.View>
      </Container>
  )}
}

export default connect(mapStateToProps)(CardsScreen)

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgb(47, 54, 65);
`;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const CloseButton = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 22px;
  background: silver;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const BackImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -20;
  opacity: .7;
`;
