import React from "react";
import {
  PanResponder,
  Animated,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import Cards from "../components/Cards";
import { DataItemsContext } from "../contexts/dataItemsContext";
import { Ionicons } from "@expo/vector-icons";

let screenHeight = Dimensions.get("window").height - 40;

class CardsScreen extends React.Component {
  static contextType = DataItemsContext;
  static navigationOptions = { headerShown: false };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0),
  };

  getNextIndex = (index) =>
    index + 1 > this.context.coursesDataNew.length - 1 ? 0 : index + 1;

  panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => true,
    onPanResponderTerminationRequest: () => false,
    onMoveShouldSetPanResponder: (event, gestureState) =>
      gestureState.dx === 0 && gestureState.dy === 0 ? false : true,

    onPanResponderGrant: () => {
      this.scrollView.setNativeProps({ scrollEnabled: false });
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.spring(this.state.translateY, { toValue: 0 }).start();

      Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
      Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();

      Animated.timing(this.state.opacity, { toValue: 0.5 }).start();
    },

    onPanResponderMove: Animated.event([
      null,
      { dx: this.state.pan.x, dy: this.state.pan.y },
    ]),

    onPanResponderRelease: () => {
      this.scrollView.setNativeProps({ scrollEnabled: true });
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
      };
      if (positionY > 250) {
        Animated.timing(this.state.pan, {
          toValue: { x: 0, y: 1000 },
        }).start(() => Reverse());
      } else if (positionY < -250) {
        Animated.timing(this.state.pan, {
          toValue: { x: 0, y: -1000 },
        }).start(() => Reverse());
      } else if (positionX > 150) {
        Animated.timing(this.state.pan, {
          toValue: { x: 1000, y: 0 },
        }).start(() => Reverse());
      } else if (positionX < -150) {
        Animated.timing(this.state.pan, {
          toValue: { x: -1000, y: 0 },
        }).start(() => Reverse());
      } else {
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();

        Animated.spring(this.state.scale, { toValue: 0.9 }).start();
        Animated.spring(this.state.translateY, { toValue: 44 }).start();

        Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
      }
    },
  });

  render() {
    const {
      pan,
      scale,
      translateY,
      thirdScale,
      thirdTranslateY,
      index,
      opacity,
    } = this.state;
    const { coursesDataNew } = this.context;
    const { navigation } = this.props;

    return (
      <RootView>
        <BackImg source={require("../assets/background6.jpg")} />
        <SafeAreaView>
          <ScrollView
            ref={(c) => {
              this.scrollView = c;
            }}
            showsVerticalScrollIndicator={false}
            style={{ height: "100%" }}
          >
            <Container>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", top: 35, right: 15 }}
              >
                <CloseButton>
                  <Ionicons name="ios-close" size={44} color="black" />
                </CloseButton>
              </TouchableOpacity>
              <AnimatedMask style={{ opacity: opacity }} />

              <Animated.View
                style={{
                  transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...this.panResponder.panHandlers}
              >
                <Cards data={coursesDataNew[index]} canOpen={true} />
              </Animated.View>

              <AnimatedCard
                style={{
                  zIndex: -1,
                  transform: [{ scale: scale }, { translateY: translateY }],
                }}
              >
                <Cards data={coursesDataNew[this.getNextIndex(index)]} />
              </AnimatedCard>

              <AnimatedCard
                style={{
                  zIndex: -3,
                  transform: [
                    { scale: thirdScale },
                    { translateY: thirdTranslateY },
                  ],
                }}
              >
                <Cards data={coursesDataNew[this.getNextIndex(index + 1)]} />
              </AnimatedCard>
            </Container>
          </ScrollView>
        </SafeAreaView>
      </RootView>
    );
  }
}

export default CardsScreen;

const RootView = styled.View`
  background: rgb(27, 31, 38);
  flex: 1;
  padding-top: 32px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: ${screenHeight}px;
`;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Card = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

const CloseButton = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 22px;
  background: silver;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const BackImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -20;
  opacity: 0.7;
`;
