import React from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native";
import styled from 'styled-components/native'
import Card from '../components/Card'
import Logo from '../components/Logo'
import QuickFacts from '../data/QuickFacts'
import Course from '../components/Course'
import Menu from "../components/Menu"
import LoadingData from "../components/Loading"
import ModalLogin from "../components/ModalLogin"
import { NotificationIcon } from '../components/Icons'
import { connect } from 'react-redux'
import { DataItemsContext } from "../contexts/dataItemsContext"
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";



const mapStateToProps = state => { return { action: state.action, name: state.name } }

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch({ type: "OPEN_MENU" }),
    openLogin: () => dispatch({ type: "OPEN_LOGIN" }),
    openNotif: () => dispatch({ type: "OPEN_NOTIF" })
  }
}

class HomeScreen extends React.Component {
  static contextType = DataItemsContext
  static navigationOptions = { headerShown: false };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  }


  componentDidUpdate() { this.toggleMenu() }

  toggleMenu = () => {
    if (this.props.action === "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start()
    }
    if (this.props.action === "openMenu") {
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start()
    }

    if (this.props.action === "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start()
    }
    if (this.props.action === "closeMenu") {
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start()

    }
  }


  handleAvatar = () => {
    if (this.props.name !== "User") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };


  render() {
    let newArr = []
    for (let [key, value] of Object.entries(this.context.coursesData)) {
      newArr.push(
        <Cover key={key}>
          <Subtitle>{key.replace(key[0], key[0].toUpperCase()).replace('_', " ")} Learning</Subtitle>
          <ScrollView
            horizontal={true}
            style={{ paddingBottom: 30 }}
            showsHorizontalScrollIndicator={false}
          >
            {value.map(course => {
              return(
                <CardsContainer key={course.id}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.push("Section", { course, key })}
                  >
                    <Card data={course} priceImg={require("../assets/free.png")} />
                  </TouchableOpacity>
                </CardsContainer>
              )})}
          </ScrollView>
        </Cover>
      )
    }
    return (
      <RootView>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
        <Menu />

        <Notifications />
        <AnimatedContainer
          style={{ transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <BackImg source={require("../assets/background6.jpg")} />
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <TouchableOpacity
                onPress={() => this.props.openNotif()}
                style={{ position: "absolute", right: 10, top: 30 }}
              >
                <NotificationButton />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleAvatar}
                style={{ position:'absolute', top: 35, left: 15}}
              >
                <Avatar  source={require('../assets/account.png')} />
                <TitleTop>Welcome back,</TitleTop>
                <NameTop>{this.props.name}</NameTop>
              </TouchableOpacity>
              <TitleBar>

                <TouchableOpacity
                  onPress={this.props.openMenu}
                >
                  <Avatar source={require('../assets/react.png')} />

                </TouchableOpacity>
                <Title>React Finder</Title>
                <Name>Your guide to React JavaScript library Everything about Learning React for Free at one place</Name>
              </TitleBar>
              <ScrollView
                style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {Logos.map(logo => {
                  let topic = logo.text.toLowerCase().replace(" ", "_")
                  return (

                    <TouchableOpacity
                      key={logo.text}
                      onPress={() => this.props.navigation.push("Cards", { topic })}
                    >
                      <Logo key={logo.text} image={logo.image} text={logo.text} />
                    </TouchableOpacity>
                  )
                }

                )}
              </ScrollView>
              {
                this.context.loading ?
                  <LoadingData /> :
                newArr
              }

              <Subtitle>Popular Courses</Subtitle>
              <CoursesContainer>
                {!this.context.loading && this.context.coursesData.redux.map(course => {
                  let key = "redux"
                  return (
                    <CourseWrapper>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.push("Section", { course, key })}
                      >
                        <Course data={course} key={course.id}/>
                      </TouchableOpacity>
                    </CourseWrapper>
                  )
                }

                )}
              </CoursesContainer>
              <Overview>{QuickFacts.overview.title}</Overview>
              <Name
                style={{textAlign:"justify", width:"90%"}}>
                {QuickFacts.overview.subtitle}
              </Name>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin: 0 auto 30px;
`;


const BackImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -20;
  opacity: .7;
  top: 0;
`;

const Container = styled.View`
  flex: 1;
  background: rgb(27, 31, 38);
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const TitleBar = styled.View`
  padding-top: 100px;
  width: 80%;
  margin: 0 auto;
`;

const TitleTop = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #848b9f;
  position: absolute;
  width: 150px;
  top: 0;
  left: 60px;
`;

const NameTop = styled.Text`
  font-size: 15px;
  width: 150px;
  color: #b8bece;
  position: absolute;
  top: 20px;
  left: 60px;
`;

const Title = styled.Text`
  font-size: 40px;
  text-align: center;
  color: #b8bece;
  font-weight: 700;
`;

const Name = styled.Text`
  text-align: center;
  font-size: 12px;
  color: rgb(89, 190, 255);
  font-weight: bold;
  width: 220px;
  margin: 0 auto 10px;
`;

const Cover = styled.View``;
const CourseWrapper = styled.View`
   margin: 10px auto;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const CardsContainer = styled.View`
  flex-direction: row;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Overview = styled.Text`
  font-size: 30px;
  text-align: center;
  color: #b8bece;
  font-weight: 700;
`;


const Logos = [
  {image: require("../assets/react.png"), text: "React"},
  {image: require("../assets/react_native.png"), text: "React Native"},
  {image: require("../assets/redux.png"), text: "Redux"},
  {image: require("../assets/graphql.png"), text: "Graphql"},
  {image: require("../assets/pathway.png"), text: "Pathway"},
]
