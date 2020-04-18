import React from "react"
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native"
import styled from 'styled-components/native'
import Topics from '../components/Topics'
import TopicsByPlatform from '../components/TopicsByPlatform'
import ResourcesSlideBar from '../components/ResourcesSlideBar'
import Articles from '../components/Articles'
import Menu from "../components/Menu"
import LoadingData from "../components/LoadingData"
import ModalLogin from "../components/ModalLogin"
import ModalSignup from "../components/ModalSignup"
import NotificationButton from "../components/NotificationButton"
import Notifications from "../components/Notifications"
import { CoursesByTopic } from './CoursesScreen'
import { connect } from 'react-redux'
import { DataItemsContext } from "../contexts/dataItemsContext"


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
    if (this.props.name === "User") { this.props.openLogin() }
    else { this.props.openMenu() }
  };


  render() {
    const { navigation, name, openMenu, openNotif } = this.props
    const { scale, opacity } = this.state
    const { loading, coursesData, coursesDataByPlatform, coursesDataNew, articlesData } = this.context


    return (
      <RootView>
        { loading ?
          <LoadingData /> :
          <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
            <Menu />
            <Notifications />
            <AnimatedContainer
              style={{ transform: [{ scale: scale }],
              opacity: opacity }}
            >
              <SafeAreaView>
                <ScrollView style={{ height: "100%" }}>

                  <Header>
                    <TitleBar>
                      <TouchableOpacity
                        onPress={() => this.handleAvatar()}
                        style={{flexDirection: 'row', }}
                      >
                        <Avatar  source={require('../assets/account.png')} />
                        <TitleWrap>
                          <TitleTop>{name === "User" ? "Please Login" : "Welcome back," }</TitleTop>
                          <NameTop>{name}</NameTop>
                        </TitleWrap>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={openNotif} > */}
                      <TouchableOpacity   onPress={() => navigation.push("Cards", navigation)} >

                        <NotificationButton />
                      </TouchableOpacity>
                    </TitleBar>
                  </Header>

                  <TouchableOpacity onPress={openMenu} >
                    <Title> React <LogoTitle source={require('../assets/react.png')} /> Finder </Title>
                  </TouchableOpacity>

                  <ResourcesSlideBar navigation={navigation} />

                  <Subtitle>Continue Learning</Subtitle>
                  <Topics data={coursesData} navigation={navigation}/>

                  <Subtitle>Courses By Platform</Subtitle>
                  <TopicsByPlatform data={coursesDataByPlatform} navigation={navigation}/>

                  <CoursesByTopic data={coursesDataNew} navigation={navigation} topic={"new"}/>

                  <Articles data={articlesData}/>

                </ScrollView>
              </SafeAreaView>
            </AnimatedContainer>
            <ModalLogin />
            <ModalSignup />
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
  padding-top: 30px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  margin: auto;
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

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;
