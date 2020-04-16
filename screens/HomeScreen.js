import React from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native";
import styled from 'styled-components/native'
import Topics from '../components/Topics'
import Logo from '../components/Logo'
import Course from '../components/Course'
import Menu from "../components/Menu"
import LoadingData from "../components/LoadingData"
import ModalLogin from "../components/ModalLogin"
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
    if (this.props.name !== "User") { this.props.openMenu(); }
    else { this.props.openLogin(); }
  };


  render() {
    return (
      <RootView>
        {   this.context.loading ?
          <LoadingData /> :
          <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
            <Menu />
            <Notifications />
            {/* <BackImg source={require("../assets/background6.jpg")} /> */}
            <AnimatedContainer
              style={{ transform: [{ scale: this.state.scale }],
              opacity: this.state.opacity }}
            >
              <SafeAreaView>
                <ScrollView style={{ height: "100%" }}>
                  <Header>
                    <TitleBar>
                      <TouchableOpacity
                        onPress={this.handleAvatar}
                        style={{flexDirection: 'row', }}
                      >
                        <Avatar  source={require('../assets/account.png')} />
                        <TitleWrap>
                          <TitleTop>{this.props.name === "User" ? "Please Login" : "Welcome back," }</TitleTop>
                          <NameTop>{this.props.name}</NameTop>
                        </TitleWrap>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.props.openNotif()}
                      >
                        <NotificationButton />
                      </TouchableOpacity>
                    </TitleBar>
                  </Header>
                  <TouchableOpacity
                    onPress={this.props.openMenu}
                  >
                    <Title>React <LogoTitle source={require('../assets/react.png')} /> Finder</Title>
                  </TouchableOpacity>
                  <ScrollView
                    style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {Logos.map(logo => {
                      let topic = logo.toLowerCase().replace(" ", "_")
                      return (
                        <TouchableOpacity
                          key={logo}
                          // onPress={() => this.props.navigation.push("Cards", { topic })}
                        >
                          <Logo text={logo} />
                        </TouchableOpacity>
                      )})
                    }
                  </ScrollView>
                  <Subtitle>Continue Learning</Subtitle>
                  <Topics data={this.context.coursesData} navigation={this.props.navigation}/>
                  <Subtitle>Courses By Platform</Subtitle>
                  <Topics data={this.context.coursesData} navigation={this.props.navigation}/>
                  <Subtitle>New Courses</Subtitle>
                  <Topics data={this.context.coursesData} navigation={this.props.navigation}/>

                  <Subtitle>Articles</Subtitle>
                  <CoursesContainer>
                    {this.context.coursesData.redux.map(course => {
                      let key = "redux"
                      return (
                        <CourseWrapper key={course.id}>
                          <TouchableOpacity
                            onPress={() => this.props.navigation.push("Section", { course, key })}
                          >
                            <Course data={course} key={course.id}/>
                          </TouchableOpacity>
                        </CourseWrapper>
                      )})
                    }
                  </CoursesContainer>

                </ScrollView>
              </SafeAreaView>
            </AnimatedContainer>
            <ModalLogin />
          </>
        }
      </RootView>
      );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const RootView = styled.View`
  background: rgb(27, 31, 38);
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const BackImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -20;
  opacity: .7;
  top: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Title = styled.Text`
  text-align: center;
  align-self: center;
  font-size: 30px;
  color: #b8bece;
  font-weight: 700;
`;

const LogoTitle = styled.Image`
  width: 40px;
  height: 36px;
`;

const Header = styled.View`
  margin: 10px auto 10px;
  justify-content: center;
`;

const TitleBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px 0 20px;
  margin: 10px auto;
`;

const TitleWrap = styled.View``;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: 15px;
`;

const TitleTop = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #848b9f;
  width: 150px;
`;

const NameTop = styled.Text`
  font-size: 15px;
  width: 150px;
  color: #b8bece;
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


const Logos = [ "Resources", "Job Search", "Podcasts", "HTML CSS" ]
