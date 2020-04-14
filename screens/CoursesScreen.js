import React, { useRef, useState } from "react";
import styled from "styled-components";
import Courses from '../components/Courses'
import { PanResponder, Animated } from 'react-native'
import { useDataItems } from "../contexts/dataItemsContext"
import { DataItemsContext } from "../contexts/dataItemsContext"


class CoursesScreen extends React.Component {
  static contextType = DataItemsContext


  static navigationOptions = {
    header: null
  };

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
    if ( nextIndex > this.context.coursesData.react_native.length - 1 ) {
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

        Animated.timing(this.state.opacity, { toValue: 1 }).start();
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
        <BackImg source={require("../assets/background6.jpg")} />

        <Animated.View
          style={{
            transform: [{ translateX: this.state.pan.x }, { translateY: this.state.pan.y }]
          }}
          {...this.panResponder.panHandlers}
        >
          {!this.context.loading && <Courses data={this.context.coursesData.react_native.filter(course => course.id === this.state.index)}/>}

        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
            { scale: this.state.scale },
            { translateY: this.state.translateY }
            ]
          }}
        >
          {!this.context.loading && <Courses data={this.context.coursesData.react_native.filter(course => course.id === this.getNextIndex(this.state.index))}/>}

        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
            { scale: this.state.thirdScale },
            { translateY: this.state.thirdTranslateY }
            ]
          }}
        >
          {!this.context.loading && <Courses data={this.context.coursesData.react_native.filter(course => course.id === this.getNextIndex(this.state.index + 1))}/>}

        </Animated.View>
      </Container>
  )}
}

export default CoursesScreen

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgb(47, 54, 65);
`;

const BackImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -20;
  opacity: .7;
`;
