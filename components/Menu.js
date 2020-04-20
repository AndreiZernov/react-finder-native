import React from 'react'
import styled from 'styled-components'
import { Animated, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MenuItem from './MenuItem'
import { connect } from 'react-redux'
import firebase from '../firebase'


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
let cardWidth = screenWidth
if (screenWidth > 500) {
  cardWidth = 500
}

const mapStateToProps = state => {
  return { action: state.action, name: state.name }
}

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => dispatch({ type: "CLOSE_MENU" }),
    updateName: name => dispatch({ type: "UPDATE_NAME", name })
  }
}

class Menu extends React.Component {
  state = { top: new Animated.Value(screenHeight) };

  componentDidMount() { this.toggleMenu() }
  componentDidUpdate() { this.toggleMenu() }

  toggleMenu = () => {
    if (this.props.action === "openMenu") {
      Animated.spring(this.state.top, { toValue: 54 }).start();
    }

    if (this.props.action === "closeMenu") {
      Animated.spring(this.state.top, { toValue: screenHeight+54 }).start()
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    }).catch(error => this.setState({ errorMessage: error.message }))
  }

  handleMenu = index => {
    if (index === 3) {
      this.props.closeMenu();
      this.props.updateName("User");
      firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
      }).catch(error => this.setState({ errorMessage: error.message }))
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <ScrollView
          style={{ height: "100%" }}
          showsHorizontalScrollIndicator={true}
        >
          <Cover>
            <Image source={require('../assets/background2.jpg')} />
            <Title>{this.props.name}</Title>
            <Subtitle>React Finder</Subtitle>
          </Cover>
          <TouchableOpacity
            onPress={this.props.closeMenu}
            style={{ position: "absolute", top: 120, left: "50%",  marginLeft: -22, zIndex: 1 }}
          >
            <CloseView>
              <Ionicons name="ios-close" size={44} color="#546bfb" />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => { this.handleMenu(index); }}
              >
                <MenuItem icon={item.icon} title={item.title} text={item.text} />
              </TouchableOpacity>
            ))}
          </Content>
        </ScrollView>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth}px;
  align-self: center;
  background: rgb(25, 25,25 );
  height: 100%;
  z-index: 100;
  border-radius: 30px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  color: white;
`;


const Content = styled.View`
  height: ${screenHeight}px;
  padding: 30px;
  height: 100%;
`;


const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;


const items = [
  { icon: "ios-settings", title: "Account", text: "settings" },
  { icon: "ios-school", title: "Courses", text: "start learning" },
  { icon: "ios-folder", title: "Helpful Resources", text: "start Using" },
  { icon: "ios-exit", title: "Log out", text: "see you soon!" }
];
