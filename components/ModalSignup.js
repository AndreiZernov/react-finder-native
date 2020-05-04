import React, { Component } from "react";
import { BlurView } from "expo-blur";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions
} from "react-native";
import firebase from "../firebase";
import LoadingData from "../components/LoadingData";
import Success from "../components/Success";
import LoadingLogin from "../components/LoadingLogin";
import { connect } from "react-redux";

let screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSignup: () => dispatch({ type: "CLOSE_SIGNUP" }),
    updateName: name => dispatch({ type: "UPDATE_NAME", name }),
    openLogin: () => dispatch({ type: "OPEN_LOGIN" }),
    closeLogin: () => dispatch({ type: "CLOSE_LOGIN" })
  };
}

class ModalSignup extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({ isLoading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          this.setState({ isLoading: false });

          if (response) {
            this.setState({ isSuccessful: true });

            this.props.updateName(this.state.displayName);

            setTimeout(() => {
              Alert.alert("Congrats", "You've Sign up successfuly!");
              this.props.closeSignup();
              this.props.closeLogin();
              this.setState({ isSuccessful: false });
            }, 1000);
          }
          if (firebase.auth().currentUser !== null) {
            firebase.auth().currentUser.updateProfile({
              displayName: this.state.displayName
            });
          }
        })
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  };

  componentDidUpdate() {
    if (this.props.action === "openSignup") {
      Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start();
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }

    if (this.props.action === "closeSignup") {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0
        }).start();

        Animated.spring(this.state.scale, { toValue: 1.3 }).start();
      }, 500);
      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  }

  tapBackground = () => {
    Keyboard.dismiss();
    this.props.closeSignup();
  };

  handleChange = () => {
    Keyboard.dismiss();
    this.props.openLogin();
    this.props.closeSignup();
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={50}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Logo source={require("../assets/react.png")} />
          <Text>Explore All Learning Content</Text>
          <TextInput
            placeholder="Name"
            value={this.state.displayName}
            onChangeText={val => this.updateInputVal(val, "displayName")}
          />
          <TextInput
            placeholder="Email"
            value={this.state.email}
            onChangeText={val => this.updateInputVal(val, "email")}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={this.state.password}
            onChangeText={val => this.updateInputVal(val, "password")}
            maxLength={15}
            secureTextEntry={true}
          />
          <IconUser source={require("../assets/account.png")} />
          <IconEmail source={require("../assets/icon-email.png")} />
          <IconPassword source={require("../assets/icon-password.png")} />

          <TouchableOpacity onPress={() => this.registerUser()}>
            <ButtonView>
              <ButtonText>Sign Up</ButtonText>
            </ButtonView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleChange()}>
            <Text>Already Registered? Click here to login</Text>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessful} />
        <LoadingLogin isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSignup);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TextInput = styled.TextInput`
  border: 1px solid rgb(47, 54, 65);
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
  color: #b8bece;
`;

const IconUser = styled.Image`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 179px;
  left: 32px;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 244px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 305px;
  left: 35px;
`;

const Modal = styled.View`
  width: 335px;
  height: 500px;
  border-radius: 20px;
  background: rgb(27, 31, 38);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 50px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

const ButtonView = styled.View`
  background: #63ccda;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgb(27, 31, 38);
`;

const ButtonText = styled.Text`
  color: rgb(27, 31, 38);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;
