import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import firebase from "../firebase";
import { _goToURL } from "../data/LinkFunc";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
let cardWidth = screenWidth;
if (screenWidth > 500) {
  cardWidth = 500;
}

const mapStateToProps = state => {
  return { action: state.action, name: state.name };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => dispatch({ type: "CLOSE_MENU" }),
    updateName: name => dispatch({ type: "UPDATE_NAME", name })
  };
};

class Menu extends React.Component {
  state = { top: new Animated.Value(screenHeight) };

  componentDidMount() {
    this.toggleMenu();
  }
  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action === "openMenu") {
      Animated.spring(this.state.top, { toValue: 54 }).start();
    }
    if (this.props.action === "closeMenu") {
      Animated.spring(this.state.top, { toValue: screenHeight + 54 }).start();
    }
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  handleMenu = index => {
    if (index === 0) {
      this.props.closeMenu();
    } else if (index === 1) {
      this.props.navigation.push("Courses");
    } else if (index === 2) {
      this.props.navigation.push("Resources");
    } else if (index === 3) {
      this.props.closeMenu();
      this.props.updateName("User");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.props.navigation.navigate("Login");
        })
        .catch(error => this.setState({ errorMessage: error.message }));
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
            <Image source={require("../assets/background2.jpg")} />
            <Title>{this.props.name}</Title>
            <Subtitle>React Finder</Subtitle>
          </Cover>
          <TouchableOpacity
            onPress={this.props.closeMenu}
            style={{
              position: "absolute",
              top: 120,
              left: "50%",
              marginLeft: -22,
              zIndex: 1
            }}
          >
            <CloseView>
              <Ionicons name="ios-close" size={44} color="#546bfb" />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.handleMenu(index);
                }}
              >
                <MenuItem
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                />
              </TouchableOpacity>
            ))}
            <Text>
              This is React Native Application with the integration of tools
              such as Redux, React Context and Hooks, Styled Components, Lottie
              Animations. Firebase Authentication, QraphQl (all data published
              and managed at Contentful).
            </Text>
            <Text>
              Project fully ready for IOS, Android deployment. Responsive Design
              for Tablets and Phones. Published at Expo Store.
            </Text>
            <Wrap>
              <Ionicons
                name="ios-laptop"
                size={34}
                color="rgb(110, 225, 245)"
              />

              <Link
                onPress={() => _goToURL("https://react-finder.netlify.app/")}
              >
                Web Version available!
              </Link>
            </Wrap>
          </Content>
        </ScrollView>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth}px;
  align-self: center;
  background: rgb(25, 25, 25);
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
  margin-top: 5px;
  color: white;
`;

const Content = styled.View`
  height: ${screenHeight}px;
  padding: 15px 10px;
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

const Text = styled.Text`
  text-align: justify;
  font-size: 14px;
  color: #b8bece;
`;

const Wrap = styled.View`
  flex-direction: row;
  margin: 0 0 50px;
  align-items: center;
  justify-content: center;
`;

const Link = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgb(110, 225, 245);
  padding-left: 5px;
`;

const items = [
  { icon: "ios-settings", title: "Home", text: "back to home page" },
  { icon: "ios-school", title: "Courses", text: "start learning" },
  { icon: "ios-folder", title: "Helpful Resources", text: "check this out" },
  { icon: "ios-exit", title: "Log out", text: "see you soon!" }
];
