import React from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native";
import styled from 'styled-components/native'
import Card from '../components/Card'
import Logo from '../components/Logo'
import QuickFacts from '../data/QuickFacts'
import Course from '../components/Course'
import Menu from "../components/Menu"
import LoadingData from "../components/Loading"
import { Ionicons } from '@expo/vector-icons'
import { NotificationIcon } from '../components/Icons'
import { connect } from 'react-redux'


const contentful = require('contentful/dist/contentful.browser.min.js');
const Client = contentful.createClient({
  space: "unj2bb6d61ak",
  accessToken: "Q5wSfpnDYJCSNHiDEPZ0CfA-fnSNH_d8P0mK04byPgw"
})


const mapStateToProps = state => {
  return { action: state.action }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch({
      type: "OPEN_MENU"
    })
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    CoursesData: {},
    loading: true
  }



  getData = async () => {
    try {
      let response = await Client.getEntries()
      let CoursesData = this.formatData(response.items)
      this.setState({
        CoursesData,
        loading: false
      })
    } catch (e) {
      console.log(e)
    }

  }

  componentDidMount() {
    this.getData()
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let img = 'http:' + item.fields.img.fields.file.url
      let course = { ...item.fields, img }
      return course
    })
    let newData = {
      react: tempItems.filter(course => course.parent1 === "react"),
      react_native: tempItems.filter(course => course.parent1 === "react_native"),
      redux: tempItems.filter(course => course.parent1 === "redux"),
      graphql: tempItems.filter(course => course.parent1 === "graphql"),
      pathway: tempItems.filter(course => course.parent1 === "pathway")
    }
    return newData
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

  render() {
      let newArr = []
      for (let [key, value] of Object.entries(this.state.CoursesData)) {
          newArr.push(
            <Cover key={key}>
              <Subtitle>{key.replace(key[0], key[0].toUpperCase())} Learning</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {value.map(course => {
                  console.log(course.img)
                  return(
                    <TouchableOpacity
                      key={course.id}
                      onPress={() => {
                        this.props.navigation.push("Section", {
                          course, key
                        })
                      }}
                    >
                      <Card
                        data={course}
                        priceImg={require("../assets/free.png")}
                      />
                    </TouchableOpacity>

                  )
                }
                )}
              </ScrollView>
            </Cover>
          )
        }


    return (
      <RootView>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
        <Menu />
        <AnimatedContainer
          style={{ transform:
            [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <NotificationIcon
                style={{ position: "absolute", right: 10, top: 40 }}
              />
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
                {Logos.map(logo =>
                  <Logo key={logo.text} image={logo.image} text={logo.text} />
                )}
              </ScrollView>
              {
                this.state.loading ?
                  <LoadingData /> :
                  newArr
              }

              {/* <Subtitle>Popular Courses</Subtitle>
                  {CoursesData.react.map(course =>
                  <Course data={course} key={course.id}/>
              )} */}
              <Overview>{QuickFacts.overview.title}</Overview>
              <Name
                style={{textAlign:"justify", width:"90%"}}>
                {QuickFacts.overview.subtitle}
              </Name>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
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


const Container = styled.View`
  flex: 1;
  background: rgb(27, 31, 38);
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const TitleBar = styled.View`
  padding-top: 70px;
  width: 80%;
  margin: 0 auto;
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
  width: 80%;
  margin: 0 auto 10px;
`;

const Cover = styled.View``;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
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
]
