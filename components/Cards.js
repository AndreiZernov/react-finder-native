import React from "react"
import styled from "styled-components"
import { Animated, TouchableWithoutFeedback, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';


function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD"
      })
  };
}


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const tabBarHeight = 83

class Cards extends React.Component {

  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(10),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(128)
  }

  openCard = () => {
    if (!this.props.canOpen) return;

    Animated.spring(this.state.cardWidth, {toValue: screenWidth - 20}).start()
    Animated.spring(this.state.cardHeight, {toValue: screenHeight - 83}).start()
    Animated.spring(this.state.titleTop, {toValue: 20}).start()
    Animated.timing(this.state.opacity, {toValue: 1}).start()

    Animated.spring(this.state.textHeight, {
      toValue: 1000
    }).start()

    this.props.openCard()
  }

  closeCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: 315 }).start();
    Animated.spring(this.state.cardHeight, { toValue: 460 }).start();
    Animated.spring(this.state.titleTop, { toValue: 10 }).start();
    Animated.timing(this.state.opacity, {toValue: 0}).start()

    Animated.spring(this.state.textHeight, {
      toValue: 128
    }).start()

    this.props.closeCard()
  };

  _goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }


  render() {
    const { data } = this.props

    const BackColor = () => {
      return data.parent1 === "react" ?  "rgb(20, 20, 20)" :
        data.parent1 === "react_native" ?  "rgba(38, 48, 52, 1)" :
        data.parent1 === "redux" ?  "rgb(3, 3, 3)" :
        data.parent1 === "graphql" ?  "rgb(5, 5, 5)" :
        data.parent1 === "pathway" ?  "rgb(4, 4, 4)" : "rgb(20, 20, 20)"
    }
    console.log(data)

    return(
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          backgroundColor: BackColor()
        }}>
          <Cover>
            <Image source={ data.parent1 === "react" ? require("../assets/background1.jpg") :
              data.parent1 === "react_native" ? require("../assets/background10.jpg") :
              data.parent1 === "redux" ? require("../assets/background9.jpg") :
              data.parent1 === "graphql" ? require("../assets/background8.jpg") :
              data.parent1 === "pathway" ? require("../assets/background4.jpg") :
              require("../assets/background1.jpg")} />
            <AnimatedTitle
              style={{top: this.state.titleTop}}>
              {data.name}
            </AnimatedTitle>
            <LogoWrapper style={{ width: data.parent1==="react_native" ? 83 : 100 }}>
              <Img source={{uri: data.img}} />
            </LogoWrapper>

            <Author>{data.author}</Author>
            <Data>{data.date.split('T')[0]}</Data>
          </Cover>
          <AnimatedContent style={{ height: this.state.textHeight }}>
            <Subtitle>Short Description:</Subtitle>
            <Text>{data.description}</Text>
            <Subtitle>Price:</Subtitle>
            <Text style={{color:"tomato"}}>{data.price}</Text>
            <Subtitle>Duration:</Subtitle>
            <Text>{data.duration}</Text>
            <Subtitle>Link to Resource:</Subtitle>
            <Link onPress={() => this._goToURL(data.link)}>Start Learning Right Now!</Link>
          </AnimatedContent>
          <AnimatedLinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
            style={{
              position: "absolute",
              zIndex: 1000,
              top: 330,
              width: "100%",
              height: this.state.textHeight
            }}
          />

          <TouchableOpacity
            onPress={this.closeCard}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <AnimatedCloseView style={{ opacity: this.state.opacity }}>
              <Ionicons name="ios-close" size={32} color="black" />
            </AnimatedCloseView>
          </TouchableOpacity>

        </AnimatedContainer>
      </TouchableWithoutFeedback>
    )
  }
}


export default connect( mapStateToProps, mapDispatchToProps)(Cards)


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

const Text = styled.Text`
  width: 80%;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;

const Link = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;

const CloseView = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 22px;
  background: silver;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
