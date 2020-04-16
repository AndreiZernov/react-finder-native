import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from "../screens/HomeScreen"
import SectionScreen from "../screens/SectionScreen"
import CardsScreen from "../screens/CardsScreen"
import CoursesScreen from "../screens/CoursesScreen"
import ResourcesScreen from "../screens/ResourcesScreen"


const activeColor = "#4775f2";
const inactiveColor = "#b8bece";



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Cards: CardsScreen,
  Courses: CoursesScreen
}, {
  mode: "modal"
});



HomeStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true
  const routeName = navigation.state.routes[navigation.state.index].routeName

  // if (routeName === "Section") {
  //   tabBarVisible = false;
  // }


  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  }
};





const CoursesStack = createStackNavigator({
  Courses: CoursesScreen,
  Section: SectionScreen
}, {
  mode: "card"
});


CoursesStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Courses",
    tabBarIcon: ({ focused }) => (
      <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
      />
    )
  }
};



const ResourcesStack = createStackNavigator({
  Resources: ResourcesScreen
});


ResourcesStack.navigationOptions = {
  tabBarLabel: "Resources",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};




// const CardsStack = createStackNavigator({
//   Cards: CardsScreen
// });
//
// CardsStack.navigationOptions = {
//   tabBarLabel: "Cards",
//   tabBarIcon: ({ focused }) => (
//     <Ionicons
//       name="ios-albums"
//       size={26}
//       color={focused ? activeColor : inactiveColor}
//     />
//   )
// };
// CardsScreen.navigationOptions = {
//   headerShown: false
// };



const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CoursesStack,
    ResourcesStack
  },
  {
    tabBarOptions: {
      activeTintColor: activeColor,
      inactiveTintColor: inactiveColor
    }
  }
);



export default createAppContainer(TabNavigator);
